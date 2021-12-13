import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useToggle } from '../../hooks/use-toggle';

const Container = styled.div<{ image: string }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url(${(props) => props.image});
  background-size: cover;
  overflow: hidden;

  @media (min-aspect-ratio: 16/9) {
    & > video {
      width: 100%;
      height: auto;
    }
  }
  @media (max-aspect-ratio: 16/9) {
    & > video {
      width: auto;
      height: 100%;
    }
  }
  @media (max-width: 767px) {
    & > video {
      display: none;
    }

    background-position: center center;
  }
`;

export const BackgroundVideo: FC<{
  image: string;
  src: string;
  type: string;
}> = ({ image, src, type }) => {
  const [loaded, toggleLoaded] = useToggle(false);
  useEffect(() => {
    toggleLoaded();
  }, []);

  return (
    <Container image={image}>
      <video poster={image} muted loop autoPlay>
        {loaded && <source src={src} type={type} />}
      </video>
    </Container>
  );
};
