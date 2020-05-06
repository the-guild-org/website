import NativeLink from 'next/link';
import styled from 'styled-components';

export const ExternalLink = styled.a.attrs((props) => ({
  href: props.href,
  target: '_blank',
  rel: 'noopener noreferrer',
}))`
  text-decoration: none;
  font-size: inherit;
  color: #03a6a6;

  &:hover {
    color: #04bfad;
    text-decoration: none;
  }
`;

const AnchorLink = styled.a`
  color: #03a6a6;
  font-size: inherit;
  text-decoration: none;
  border-bottom: 1px dotted;

  &:hover {
    color: #04bfad;
    text-decoration: none;
  }
`;

export const GenericLink = (props) => {
  if (props.href.startsWith('/') && !props.href.startsWith('/blog')) {
    return <InternalLink {...props} />;
  }

  if (props.href.startsWith('#')) {
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
          text-decoration: none;
          font-size: inherit;
          color: #03a6a6;
        }
        a:hover {
          color: #04bfad;
          text-decoration: none;
        }
      `}</style>
    </a>
  </NativeLink>
);
