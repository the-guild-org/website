export function prettyPrintTag(tag = "All") {
  let text = tag;
  if (text === "typescript") {
    text = "TypeScript";
  }
  if (text === "css") {
    text = "CSS";
  }
  if (text === "rest") {
    text = "REST";
  }
  text = text.replace("graphql", "GraphQL");
  text = text.replace(/-js$/, " JS");
  text = text[0]!.toUpperCase() + text.slice(1);
  text = text
    .replaceAll("-", " ")
    .replaceAll(/\b\w/g, (char) => char.toUpperCase());
  return text;
}
