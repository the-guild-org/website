import { FC, ReactElement } from 'react';
import styled from 'styled-components';
import NativeLink from 'next/link';
import LazyLoad from 'react-lazyload';
import { Image } from '../blog/image';
import { withPlaceholder } from '../../lib/images';

const Title = styled.h2`
  color: var(--colors-text);
`;

const Description = styled.div`
  color: var(--colors-dim);
  margin: 1rem 0;
`;

const Link = styled(NativeLink)`
  &:hover > * {
    opacity: var(--hover-opacity);
  }
`;

const Cover = styled(Image)<{
  noShadow: boolean;
  maxSize?: number;
  isPlaceholder?: boolean;
}>`
  display: block;
  max-width: ${(props) => (props.maxSize ? `${props.maxSize}px` : '100%')};
  min-width: 200px;
  max-height: 200px;
  object-fit: contain;
  height: auto;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: ${(props) =>
    props.noShadow ? 'none' : 'box-shadow: 0 2px 6px 0 rgba(0,0,0,0.18)'};
  ${(props) => (props.isPlaceholder ? 'filter: blur(25px);' : '')}
`;

const Placeholder = styled.div`
  display: block;
  max-width: 100%;
  min-width: 200px;
  max-height: 200px;
  height: auto;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
`;

const Container = styled.div<{ width: number }>`
  display: flex;
  text-align: left;

  @media (max-width: 960px) {
    flex-direction: column;
    text-align: center;

    & > *:last-child {
      max-width: 50%;
      margin: 25px auto 0 auto;
    }
  }

  @media (min-width: 640px) {
    & > *:first-of-type {
      width: 70%;
      margin: 0 auto;
    }

    & > *:last-child {
      max-width: 50%;
      margin: 25px auto 0 auto;
    }
  }

  @media (max-width: 640px) {
    & > *:first-of-type {
      width: 70%;
      margin: 0 auto;
    }

    & > *:last-child {
      max-width: 70%;
      margin: 25px auto 0 auto;
    }
  }

  @media (min-width: 961px) {
    align-items: center;
    justify-content: space-between;

    & > *:first-of-type {
      width: ${(props) => props.width}%;
    }

    & > *:last-child {
      width: 50%;
      margin: 0 auto;
    }
  }
`;

export const Featured: FC<{
  title: string;
  description: string | ReactElement;
  image: string;
  link: string;
  noShadow?: boolean;
  width?: number;
  maxCoverSize?: number;
  className?: string;
}> = ({
  title,
  description,
  image,
  link,
  className,
  noShadow,
  width,
  maxCoverSize,
}) => {
  const { placeholder, hasPlaceholder } = withPlaceholder(image);
  return (
    <Container className={className} width={width || 40}>
      <Link href={link} as="a" title={title}>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Link>
      <Link href={link} as="a" title={title}>
        <LazyLoad
          height={150}
          once
          offset={300}
          placeholder={
            hasPlaceholder ? (
              <Cover
                src={placeholder}
                alt={title}
                noShadow={!!noShadow}
                maxSize={maxCoverSize}
                isPlaceholder={hasPlaceholder}
              >
                <div />
              </Cover>
            ) : (
              <Placeholder />
            )
          }
          debounce={500}
        >
          <Cover
            src={image}
            alt={title}
            noShadow={!!noShadow}
            maxSize={maxCoverSize}
          />
        </LazyLoad>
      </Link>
    </Container>
  );
};
