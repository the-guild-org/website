import styled from "styled-components";
import { Code, InlineCode } from "./code";
import { GenericLink } from "./link";

export const H1 = styled.h1`
  text-align: center;
  margin-top: 0;
  font-size: 2rem;
`;

export const H2 = styled.h1`
  margin-top: 2.5rem;
  font-size: 1.5rem;
`;

const P = styled.p`
  line-height: 2rem;
  margin-bottom: 2rem;
`;

const Ul = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
`;

const Li = styled.li`
  margin-bottom: 0.35rem;

  &:before {
    content: "-";
    display: inline-block;
    color: #6d6d6d;
    position: absolute;
    margin-left: -25px;
  }
`;

const Blockquote = styled.blockquote`
  margin: 2rem 0;
  padding-left: 3rem;
  color: #777;
  font-size: 1.5rem;
  font-weight: 400;
  font-style: italic;

  & > p {
    line-height: 2.5rem;
  }
`;

const Hr = () => (
  <div>
    <hr />
    <style jsx>{`
      hr {
        margin: 4rem 0;
        border: none;
        border-bottom: 1px solid #eee;
      }
    `}</style>
  </div>
);

const Img = styled.img.attrs((props) => ({
  ...props,
  alt: props.alt || "",
}))`
  display: block;
  max-width: 100%;
  margin: 0 auto;
`;

export const components = {
  h1: H1,
  h2: H2,
  li: Li,
  ul: Ul,
  code: Code,
  inlineCode: InlineCode,
  blockquote: Blockquote,
  a: GenericLink,
  p: P,
  hr: Hr,
  img: Img,
};
