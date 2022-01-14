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
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2px;
  padding-left: 5px;
  padding-right: 5px;
  font: 1rem Monaco, Consolas, 'Andale  Mono', 'DejaVu Sans Mono', monospace;
`;
