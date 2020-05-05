import NativeLink from "next/link";
import styled from "styled-components";

export const ExternalLink = styled.a.attrs((props) => ({
  href: props.href,
  target: "_blank",
  rel: "noopener noreferrer",
}))`
  text-decoration: underline;
  font-size: inherit;
  color: inherit;
`;

const AnchorLink = styled.a`
  color: inherit;
  font-size: inherit;
  border-bottom: 1px dotted;

  &:hover {
    color: gray;
    text-decoration: none;
  }
`;

export const GenericLink = (props) => {
  if (props.href.startsWith("/") && !props.href.startsWith("/blog")) {
    return <InternalLink {...props} />;
  }

  if (props.href.startsWith("#")) {
    return <AnchorLink {...props} />;
  }

  return <ExternalLink {...props} />;
};

export const InternalLink = ({ href, as, children }) => (
  <NativeLink href={href} as={as}>
    <a>
      {children}

      <style jsx>{`
        a {
          text-decoration: underline;
          font-size: inherit;
        }
        a:hover {
          text-decoration: none;
        }
      `}</style>
    </a>
  </NativeLink>
);
