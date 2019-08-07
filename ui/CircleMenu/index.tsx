import React, { useContext, useCallback } from 'react';

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

const Item: React.FunctionComponent<{ item: T.CircleMenuItem }> = ({
  item,
}) => {
  const { setText, resetText } = useContext(MenuContext);
  const onEnter = useCallback(() => {
    setText(item.text);
  }, [setText]);
  const onLeave = useCallback(() => {
    resetText();
  }, [resetText]);

  return (
    <S.Item
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      point={item.point}
      noRotation={!item.isEdge}
    >
      {item.element({
        point: item.point,
        size: item.size,
      })}
    </S.Item>
  );
};

const Text: React.FunctionComponent = () => {
  const { text } = useContext(MenuContext);
  
  return (
    <S.InnerContent>
      <Oval size={150}>{text}</Oval>
    </S.InnerContent>
  );
};

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

  return (
    <S.Container size={size} padding={itemSize / 2}>
      <S.Content>
        {items.map((item, key) => (
          <Item key={key} item={item} />
        ))}
        <Text />
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
