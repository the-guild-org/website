import React, { useContext } from 'react';

import * as S from './styles';
import * as T from './types';
import { useCircleMenu } from './hooks';
import { MenuProvider, MenuContext } from './context';
import { Oval } from '../Oval';

interface CircleMenuProps {
  size: number;
  itemSize: number;
  edgeHeight: number;
  edgeGap: number;
  menu: T.MenuItem[];
  edge: T.EdgeElement;
}

const CircleMenuInner: React.FunctionComponent<CircleMenuProps> = ({
  size,
  menu,
  itemSize,
  edgeHeight,
  edge,
  edgeGap,
}) => {
  const items = useCircleMenu({
    size,
    menu,
    itemSize,
    edgeHeight,
    edge,
    edgeGap,
  });
  const {text, setText, resetText} = useContext(MenuContext);

  return (
    <S.Container size={size} padding={itemSize / 2}>
      <S.Content>
        {items.map((item, key) => {
          return (
            <S.Item
              key={key}
              onMouseEnter={e => {
                e.preventDefault();
                setText(item.text);
              }}
              onMouseLeave={e => {
                e.preventDefault();
                resetText();
              }}
              point={item.point}
              noRotation={!item.isEdge}
            >
              {item.element({
                point: item.point,
                size: item.size,
              })}
            </S.Item>
          );
        })}
        <S.InnerContent>
          <Oval size={150}>{text}</Oval>
        </S.InnerContent>
      </S.Content>
    </S.Container>
  );
};

export const CircleMenu: React.FunctionComponent<CircleMenuProps> = props => {
  return (
    <MenuProvider>
      <CircleMenuInner {...props} />
    </MenuProvider>
  );
};
