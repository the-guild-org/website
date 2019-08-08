import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Left = styled.div`
  margin-right: 20px;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
`;

const Right = styled.div`
  flex-grow: 0;
  flex-shrink: 1;
`;

const Circle = styled.div`
  width: 43px;
  height: 43px;
  flex-grow: 0;
  flex-shrink: 0;
  border: solid 2px #00eaff;
  border-radius: 50%;
`;

const Line = styled.div`
  width: 2px;
  height: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  background-color: #00eaff;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
`;

const Text = styled.div`
  margin: 15px 0;
  font-size: 16px;
  font-weight: 300;
  color: #919FB5;
`;

const indexes = 'abcdefg';

const Option: React.FunctionComponent<{
  index: number;
  title: string;
  text: string;
}> = ({ index, title, text }) => {
  return (
    <OptionContainer>
      {/* <Left>
        <Circle />
        <Line />
      </Left> */}
      {/* <Right>
        <Header>{indexes[index]}. {title}</Header>
        <Text>
          {text}
        </Text>
      </Right> */}
      <Header>
        {indexes[index].toUpperCase()}. {title}
      </Header>
      <Text>{text}</Text>
    </OptionContainer>
  );
};

export const Options: React.FunctionComponent = () => {
  return (
    <Container>
      <Option
        index={0}
        title='Keeping you up to date'
        text='Get the library maintainers themselves to keep your code up to date.'
      />
      <Option
        index={1}
        title='Get a seat at the table'
        text='You already depend on us but you have no influence. Get the power to decide what we should do. Connect your CI to our libraries so we guarantee not to break your app!'
      />
      <Option
        index={2}
        title='Work with the best'
        text='Recurring meetings with the maintainers, ask and learn whatever you want!'
      />
    </Container>
  );
};
