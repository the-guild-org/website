import styled from 'styled-components';

export const Code = styled.pre.attrs<{ syntax?: string }>(({ syntax }) => ({
  className: syntax ? ` ${syntax}` : '',
}))`
  background: #1d1f21;
  color: #f8f8f2;
  overflow: auto;
  padding: 1.5rem;
  margin: 40px 0;
  border-radius: 3px;
  -webkit-overflow-scrolling: touch;

  font-size: 1rem;
  white-space: pre-wrap;
  word-break: break-word;
  letter-spacing: 0;
  font-weight: 400;
  line-height: 1.4;
`;

export const InlineCode = styled.code.attrs<{ wrap?: boolean }>(({ wrap }) => ({
  className: wrap ? 'wrap' : '',
}))`
  background-color: rgba(0, 0, 0, 0.05);
  font-size: 1.2rem;
  white-space: pre-wrap;
  padding: 3px 4px;
  margin: 0 2px;
`;
