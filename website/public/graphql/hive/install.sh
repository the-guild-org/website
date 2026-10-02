#!/bin/sh
{
  set -e
  SUDO=''
  if [ "$(id -u)" != "0" ]; then
    SUDO='sudo'
    echo "This script requires superuser access."
    echo "You will be prompted for your password by sudo."
    # clear any previous sudo permission
    sudo -k
  fi

  # Supports these options of passing a version:
  # 1.
  #   curl -sSL https://graphql-hive.com/install.sh | HIVE_CLI_VERSION=0.30.1 sh
  # 2.
  #   export HIVE_CLI_VERSION="0.30.1"
  #   curl -sSL https://graphql-hive.com/install.sh | sh
  # 3.
  #   curl -sSL https://graphql-hive.com/install.sh | sh -s 0.30.1
  VERSION_FROM_FIRST_ARG="$1"
  # if HIVE_CLI_VERSION and VERSION_FROM_FIRST_ARG are empty, ignore the HIVE_CLI_VERSION
  if [ -z "$VERSION_FROM_FIRST_ARG" ] && [ -z "$HIVE_CLI_VERSION" ]; then
    REQUESTED_VERSION=""
  else
    REQUESTED_VERSION="${HIVE_CLI_VERSION:-$VERSION_FROM_FIRST_ARG}"
  fi

  # run inside sudo
  $SUDO sh -s -- "$REQUESTED_VERSION" <<'SCRIPT'
      set -e

      REQUESTED_VERSION="$1"
      OS=""
      ARCH=""
      DOWNLOAD_DIR=""
      CLI_BASE_URL="https://cli.graphql-hive.com"
      CLI_STABLE_VERSION_URL="$CLI_BASE_URL/channels/stable/VERSION"

      echoerr() { echo "$@" 1>&2; }

      cleanup() {
        if [ -n "$DOWNLOAD_DIR" ] && [ -d "$DOWNLOAD_DIR" ]; then
          rm -rf "$DOWNLOAD_DIR"
        fi
      }

      trap cleanup 0
      trap 'exit 129' 1
      trap 'exit 130' 2
      trap 'exit 131' 3
      trap 'exit 143' 15

      unsupported_arch() {
        echoerr "Hive Console CLI does not support $@ at this time."
        echo "If you think that's a bug - please file an issue to https://github.com/graphql-hive/platform/issues"
        exit 1
      }

      unsupported_win() {
        echoerr "This installation script does not support Windows."
        echo "Go to https://docs.graphql-hive.com and look for Windows installer."
        exit 1
      }

      set_os_arch() {
        case "$(uname -s)" in
          Darwin) OS=darwin ;;
          Linux*) OS=linux ;;
          *) unsupported_win ;;
        esac

        ARCH="$(uname -m)"
        if [ "$ARCH" = "x86_64" ]; then
          ARCH=x64
        elif [ "$ARCH" = "amd64" ]; then
          ARCH=x64
        elif [ "$OS" = "darwin" ]; then
          ARCH=arm64
        elif [ "$ARCH" = "aarch64" ]; then
          ARCH=arm64
        else
         unsupported_arch "$OS / $ARCH"
        fi
      }

      has_cmd() {
        command -v "$1" > /dev/null 2>&1
        return $?
      }

      download_file() {
        URL="$1"
        OUTPUT="$2"

        if has_cmd curl
        then curl --fail --location --silent --show-error "$URL" --output "$OUTPUT"
        elif has_cmd wget
        then wget --quiet "$URL" --output-document="$OUTPUT"
        else echoerr "curl or wget is required" && exit 1
        fi
      }

      set_checksum_tool() {
        if has_cmd sha256sum; then
          CHECKSUM_TOOL=sha256sum
        elif has_cmd shasum; then
          CHECKSUM_TOOL=shasum
        else
          echoerr "sha256sum or shasum is required to verify the Hive CLI download."
          exit 1
        fi
      }

      resolve_version() {
        if [ -n "$REQUESTED_VERSION" ]; then
          VERSION="$REQUESTED_VERSION"
        else
          STABLE_VERSION_PATH="$DOWNLOAD_DIR/VERSION"
          download_file "$CLI_STABLE_VERSION_URL" "$STABLE_VERSION_PATH"
          VERSION="$(tr -d '[:space:]' < "$STABLE_VERSION_PATH")"
        fi

        case "$VERSION" in
          ''|*[!0-9A-Za-z.+-]*)
            echoerr "Unable to resolve a valid Hive CLI version."
            exit 1
            ;;
        esac
      }

      verify_archive() {
        MANIFEST_PATH="$DOWNLOAD_DIR/SHA256SUMS"
        MANIFEST_URL="$CLI_BASE_URL/versions/$VERSION/SHA256SUMS"

        echo "Downloading checksum manifest $MANIFEST_URL"
        download_file "$MANIFEST_URL" "$MANIFEST_PATH"

        EXPECTED_CHECKSUM="$(
          awk -v archive="$ARCHIVE_NAME" '
            $2 == archive { checksum = $1; matches++ }
            END {
              if (matches != 1) exit 1
              print checksum
            }
          ' "$MANIFEST_PATH"
        )" || {
          echoerr "Archive $ARCHIVE_NAME is absent from the checksum manifest."
          exit 1
        }

        if [ "$CHECKSUM_TOOL" = "sha256sum" ]; then
          ACTUAL_CHECKSUM="$(sha256sum "$ARCHIVE_PATH" | awk '{ print $1 }')"
        else
          ACTUAL_CHECKSUM="$(shasum -a 256 "$ARCHIVE_PATH" | awk '{ print $1 }')"
        fi

        if [ "$ACTUAL_CHECKSUM" != "$EXPECTED_CHECKSUM" ]; then
          echoerr "Checksum verification failed for $ARCHIVE_NAME."
          exit 1
        fi

        echo "Checksum verified for $ARCHIVE_NAME"
      }

      download() {
        umask 077
        DOWNLOAD_DIR="$(mktemp -d "${TMPDIR:-/tmp}/hive.XXXXXX")"

        resolve_version

        TARGET="$OS-$ARCH"
        ARCHIVE_NAME="hive-v$VERSION-$TARGET.tar.gz"
        ARCHIVE_PATH="$DOWNLOAD_DIR/$ARCHIVE_NAME"
        URL="$CLI_BASE_URL/versions/$VERSION/$ARCHIVE_NAME"
        echo "Downloading $URL"
        download_file "$URL" "$ARCHIVE_PATH"

        echo "Downloaded to $DOWNLOAD_DIR"
        verify_archive

        mkdir -p /usr/local/lib
        rm -rf "/usr/local/lib/hive"
        tar xzf "$ARCHIVE_PATH" -C /usr/local/lib
        echo "Unpacked to /usr/local/lib/hive"

        echo "Installing to /usr/local/bin/hive"
        rm -f /usr/local/bin/hive
        ln -s /usr/local/lib/hive/bin/hive /usr/local/bin/hive
      }

      set_os_arch
      set_checksum_tool
      download

SCRIPT
  LOCATION=$(command -v hive)
  echo "Hive Console CLI installed to $LOCATION"
  hive --version
}
