#!/bin/sh

set -eu

echo 'Hive installer tests started.'

SCRIPT_DIR="$(CDPATH='' cd -- "$(dirname -- "$0")" && pwd)"
INSTALL_SCRIPT="$SCRIPT_DIR/../../public/graphql/hive/install.sh"
TEST_DIR="$(mktemp -d "${TMPDIR:-/tmp}/hive-install-test.XXXXXX")"
REAL_RM="$(command -v rm)"
START_AT="$(date '+%H:%M:%S')"
START_TIME="$(date '+%s')"
TESTS_PASSED=0

cleanup() {
  "$REAL_RM" -rf "$TEST_DIR"
}

trap cleanup 0
trap 'exit 129' 1
trap 'exit 130' 2
trap 'exit 131' 3
trap 'exit 143' 15

fail() {
  echo "FAIL: $*" >&2
  exit 1
}

pass() {
  TESTS_PASSED=$((TESTS_PASSED + 1))
}

assert_contains() {
  case "$1" in
    *"$2"*) ;;
    *) fail "expected output to contain: $2" ;;
  esac
}

assert_not_contains() {
  case "$1" in
    *"$2"*) fail "expected output not to contain: $2" ;;
    *) ;;
  esac
}

link_command() {
  COMMAND_PATH="$(command -v "$1")"
  ln -s "$COMMAND_PATH" "$MOCK_BIN/$1"
}

setup_case() {
  CASE_NAME="$1"
  CHECKSUM_TOOL="$2"
  MOCK_BIN="$TEST_DIR/$CASE_NAME/bin"
  MOCK_LOG="$TEST_DIR/$CASE_NAME/commands.log"
  mkdir -p "$MOCK_BIN"
  : > "$MOCK_LOG"

  for command in awk mktemp sed sh tr; do
    link_command "$command"
  done

  cat > "$MOCK_BIN/id" << 'MOCK'
#!/bin/sh
echo 0
MOCK

  cat > "$MOCK_BIN/uname" << 'MOCK'
#!/bin/sh
case "${1:-}" in
  -s) echo "${MOCK_UNAME:-Linux}" ;;
  -m) echo "${MOCK_ARCH:-x86_64}" ;;
  *) echo "${MOCK_UNAME:-Linux}" ;;
esac
MOCK

  cat > "$MOCK_BIN/curl" << 'MOCK'
#!/bin/sh
URL=''
OUTPUT=''
while [ "$#" -gt 0 ]; do
  case "$1" in
    --output)
      OUTPUT="$2"
      shift 2
      ;;
    --*) shift ;;
    *)
      URL="$1"
      shift
      ;;
  esac
done

echo "curl $URL" >> "$MOCK_LOG"
case "$URL" in
  */channels/stable/VERSION)
    printf '%s\n' "$MOCK_STABLE_VERSION" > "$OUTPUT"
    ;;
  */SHA256SUMS)
    if [ "$MOCK_MANIFEST_MODE" = "missing" ]; then
      printf '%s  another-archive.tar.gz\n' "$MOCK_EXPECTED_DIGEST" > "$OUTPUT"
    else
      printf '%s  %s\n' "$MOCK_EXPECTED_DIGEST" "$MOCK_ARCHIVE_NAME" > "$OUTPUT"
    fi
    ;;
  *.tar.gz)
    printf 'mock archive\n' > "$OUTPUT"
    ;;
  *)
    echo "Unexpected URL: $URL" >&2
    exit 1
    ;;
esac
MOCK

  cat > "$MOCK_BIN/mkdir" << 'MOCK'
#!/bin/sh
echo "mkdir $*" >> "$MOCK_LOG"
MOCK

  cat > "$MOCK_BIN/rm" << 'MOCK'
#!/bin/sh
case "$*" in
  *"/usr/local/"*)
    echo "rm $*" >> "$MOCK_LOG"
    ;;
  *)
    "$REAL_RM" "$@"
    ;;
esac
MOCK

  cat > "$MOCK_BIN/tar" << 'MOCK'
#!/bin/sh
echo "tar $*" >> "$MOCK_LOG"
MOCK

  cat > "$MOCK_BIN/ln" << 'MOCK'
#!/bin/sh
echo "ln $*" >> "$MOCK_LOG"
MOCK

  cat > "$MOCK_BIN/hive" << 'MOCK'
#!/bin/sh
echo "hive version mock"
MOCK

  if [ "$CHECKSUM_TOOL" = "sha256sum" ]; then
    cat > "$MOCK_BIN/sha256sum" << 'MOCK'
#!/bin/sh
echo "sha256sum" >> "$MOCK_LOG"
printf '%s  %s\n' "$MOCK_ACTUAL_DIGEST" "$1"
MOCK
  elif [ "$CHECKSUM_TOOL" = "shasum" ]; then
    cat > "$MOCK_BIN/shasum" << 'MOCK'
#!/bin/sh
echo "shasum $*" >> "$MOCK_LOG"
printf '%s  %s\n' "$MOCK_ACTUAL_DIGEST" "$3"
MOCK
  fi

  chmod +x "$MOCK_BIN"/*
}

run_installer() {
  VERSION="${1:-}"
  set +e
  if [ -n "$VERSION" ]; then
    OUTPUT="$(
      PATH="$MOCK_BIN" \
        MOCK_LOG="$MOCK_LOG" \
        REAL_RM="$REAL_RM" \
        MOCK_UNAME="$MOCK_UNAME" \
        MOCK_ARCH="$MOCK_ARCH" \
        MOCK_STABLE_VERSION="$MOCK_STABLE_VERSION" \
        MOCK_MANIFEST_MODE="$MOCK_MANIFEST_MODE" \
        MOCK_EXPECTED_DIGEST="$MOCK_EXPECTED_DIGEST" \
        MOCK_ACTUAL_DIGEST="$MOCK_ACTUAL_DIGEST" \
        MOCK_ARCHIVE_NAME="$MOCK_ARCHIVE_NAME" \
        sh "$INSTALL_SCRIPT" "$VERSION" 2>&1
    )"
  else
    OUTPUT="$(
      PATH="$MOCK_BIN" \
        MOCK_LOG="$MOCK_LOG" \
        REAL_RM="$REAL_RM" \
        MOCK_UNAME="$MOCK_UNAME" \
        MOCK_ARCH="$MOCK_ARCH" \
        MOCK_STABLE_VERSION="$MOCK_STABLE_VERSION" \
        MOCK_MANIFEST_MODE="$MOCK_MANIFEST_MODE" \
        MOCK_EXPECTED_DIGEST="$MOCK_EXPECTED_DIGEST" \
        MOCK_ACTUAL_DIGEST="$MOCK_ACTUAL_DIGEST" \
        MOCK_ARCHIVE_NAME="$MOCK_ARCHIVE_NAME" \
        sh "$INSTALL_SCRIPT" 2>&1
    )"
  fi
  STATUS=$?
  set -e
}

DIGEST_A='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
DIGEST_B='bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
MOCK_UNAME='Linux'
MOCK_ARCH='x86_64'

setup_case explicit-success sha256sum
MOCK_STABLE_VERSION='9.8.7'
MOCK_MANIFEST_MODE='match'
MOCK_EXPECTED_DIGEST="$DIGEST_A"
MOCK_ACTUAL_DIGEST="$DIGEST_A"
MOCK_ARCHIVE_NAME='hive-v1.2.3-linux-x64.tar.gz'
run_installer '1.2.3'
[ "$STATUS" -eq 0 ] || fail "explicit version install failed: $OUTPUT"
assert_contains "$OUTPUT" 'Checksum verified for hive-v1.2.3-linux-x64.tar.gz'
assert_contains "$(cat "$MOCK_LOG")" '/versions/1.2.3/hive-v1.2.3-linux-x64.tar.gz'
assert_not_contains "$(cat "$MOCK_LOG")" '/channels/stable/VERSION'
pass

setup_case stable-success shasum
MOCK_UNAME='Darwin'
MOCK_ARCH='arm64'
MOCK_STABLE_VERSION='9.8.7'
MOCK_MANIFEST_MODE='match'
MOCK_EXPECTED_DIGEST="$DIGEST_A"
MOCK_ACTUAL_DIGEST="$DIGEST_A"
MOCK_ARCHIVE_NAME='hive-v9.8.7-darwin-arm64.tar.gz'
run_installer
[ "$STATUS" -eq 0 ] || fail "stable install failed: $OUTPUT"
assert_contains "$(cat "$MOCK_LOG")" '/channels/stable/VERSION'
assert_contains "$(cat "$MOCK_LOG")" '/versions/9.8.7/hive-v9.8.7-darwin-arm64.tar.gz'
assert_contains "$(cat "$MOCK_LOG")" 'shasum -a 256'
pass

setup_case missing-archive sha256sum
MOCK_UNAME='Linux'
MOCK_ARCH='x86_64'
MOCK_STABLE_VERSION='9.8.7'
MOCK_MANIFEST_MODE='missing'
MOCK_EXPECTED_DIGEST="$DIGEST_A"
MOCK_ACTUAL_DIGEST="$DIGEST_A"
MOCK_ARCHIVE_NAME='hive-v1.2.3-linux-x64.tar.gz'
run_installer '1.2.3'
[ "$STATUS" -ne 0 ] || fail 'missing archive unexpectedly succeeded'
assert_contains "$OUTPUT" 'Archive hive-v1.2.3-linux-x64.tar.gz is absent from the checksum manifest.'
assert_not_contains "$(cat "$MOCK_LOG")" 'tar '
pass

setup_case digest-mismatch sha256sum
MOCK_STABLE_VERSION='9.8.7'
MOCK_MANIFEST_MODE='match'
MOCK_EXPECTED_DIGEST="$DIGEST_A"
MOCK_ACTUAL_DIGEST="$DIGEST_B"
MOCK_ARCHIVE_NAME='hive-v1.2.3-linux-x64.tar.gz'
run_installer '1.2.3'
[ "$STATUS" -ne 0 ] || fail 'checksum mismatch unexpectedly succeeded'
assert_contains "$OUTPUT" 'Checksum verification failed for hive-v1.2.3-linux-x64.tar.gz.'
assert_not_contains "$(cat "$MOCK_LOG")" 'tar '
pass

setup_case missing-tool none
MOCK_STABLE_VERSION='9.8.7'
MOCK_MANIFEST_MODE='match'
MOCK_EXPECTED_DIGEST="$DIGEST_A"
MOCK_ACTUAL_DIGEST="$DIGEST_A"
MOCK_ARCHIVE_NAME='hive-v1.2.3-linux-x64.tar.gz'
run_installer '1.2.3'
[ "$STATUS" -ne 0 ] || fail 'install without a checksum tool unexpectedly succeeded'
assert_contains "$OUTPUT" 'sha256sum or shasum is required to verify the Hive CLI download.'
assert_not_contains "$(cat "$MOCK_LOG")" 'curl '
pass

DURATION=$(($(date '+%s') - START_TIME))
printf '\n\033[2;37m Test Files  \033[1;38;2;124;255;0m1 passed\033[2;37m (1)\033[0m\n'
printf '\033[2;37m      Tests  \033[1;38;2;124;255;0m%s passed\033[2;37m (%s)\033[0m\n' \
  "$TESTS_PASSED" "$TESTS_PASSED"
printf '\033[2;37m   Start at  \033[0m%s\n' "$START_AT"
printf '\033[2;37m   Duration  \033[0m%ss\n' "$DURATION"
