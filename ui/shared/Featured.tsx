import { FC, ReactElement } from 'react';
import { styled } from '@stitches/react';
import NativeLink from 'next/link';
import LazyLoad from 'react-lazyload';
import clsx from 'clsx';
import { Image } from '../components';
import { withPlaceholder } from '../../lib/images';

const Link = styled(NativeLink, {
  '&:hover > *': {
    opacity: 'var(--hover-opacity)',
  },
});

const Cover = styled(Image, {
  display: 'block',
  minWidth: '200px !important',
  maxHeight: 200,
  objectFit: 'contain',
  height: 'auto',
  margin: '0 auto',
  borderRadius: 5,
});

const Placeholder = styled('div', {
  display: 'block',
  maxWidth: '100%',
  minWidth: 200,
  maxHeight: 200,
  height: 'auto',
  margin: '0 auto',
  borderRadius: 5,
  boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.18)',
});

const Container = styled('div', {
  display: 'flex',
  textAlign: 'left',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& > *:last-child': {
    width: '50%',
    margin: '0 auto',
  },
});

export const Featured: FC<{
  title: string;
  description: string | ReactElement;
  image: string;
  link: string;
  noShadow?: boolean;
  width?: number;
  maxCoverSize?: number;
  className?: string;
}> = ({ title, description, image, link, className, noShadow, width }) => {
  const { placeholder, hasPlaceholder } = withPlaceholder(image);
  return (
    <Container className={className}>
      <Link href={link} as="a" title={title} style={{ width: `${width}%` }}>
        <h2 className="text-gray-900 dark:text-gray-50">{title}</h2>
        <div className="mt-5 text-gray-500">{description}</div>
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
                className={clsx(
                  'max-w-[200px]',
                  !noShadow && '[box-shadow:0_2px_6px_0_rgba(0,0,0,0.18)]'
                )}
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
            className={clsx(
              'max-w-[200px]',
              !noShadow && '[box-shadow:0_2px_6px_0_rgba(0,0,0,0.18)]'
            )}
          />
        </LazyLoad>
      </Link>
    </Container>
  );
};
