import styled from 'styled-components';
import { Featured } from './Featured';

export const Project = styled(Featured).attrs({
  width: 80,
  noShadow: true,
  maxCoverSize: 200,
})`
  padding: 50px 0;
`;

export const ProjectSeparator = styled.div`
  margin: 30px auto;
  width: 50px;
  height: 2px;
  background-color: var(--colors-accent-light);
`;
