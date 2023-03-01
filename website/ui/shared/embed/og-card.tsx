import { ReactElement } from 'react';
import { styled } from '../../../stitches.config';
import { Observer } from '../observer';

type PreviewData = {
  description: string;
  url: string;
  image: string;
  title: string;
};

const Container = styled('div', {
  display: 'table',
  width: '100%',
  marginTop: 45,
  marginBottom: 45,
  maxHeight: 280,
  boxSizing: 'border-box',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04), inset 0 0 0 1px rgba(0, 0, 0, 0.09)',
  borderRadius: 5,
  '&:hover': {
    opacity: 'var(--hover-opacity)',
  },
});

const TextLink = styled('a', {
  background: 'rgba(255, 255, 255, 0)',
  textDecoration: 'none',
  display: 'table-cell',
  verticalAlign: 'middle',
  padding: 20,
  '& > strong': {
    display: 'block',
    marginBottom: 10,
    fontWeight: 700,
    fontStyle: 'normal',
    fontSize: '1rem',
    lineHeight: 1.3,
    color: 'var(--colors-text)',
  },
  '& > em': {
    fontSize: '0.85rem',
    fontStyle: 'normal',
    color: 'var(--colors-dim)',
    display: 'block',
    maxHeight: 120,
    overflow: 'hidden',
    wordBreak: 'break-word',
    lineHeight: 1.3,
  },
  '@media (max-width: 640px)': {
    '& > strong': {
      marginBottom: 0,
    },
    '& > em': {
      display: 'none',
      visibility: 'hidden',
    },
  },
});

const ImageLink = styled('a', {
  display: 'table-cell',
  verticalAlign: 'middle',
  width: 160,
  height: 160,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.09)',
  borderRadius: '0 5px 5px 0',
  '@media (max-width: 640px)': {
    width: 90,
    height: 90,
  },
});

export const OgCard = ({ description, url, image, title }: PreviewData): ReactElement => {
  return (
    <Observer>
      <Container>
        <TextLink href={url}>
          <strong>{title}</strong>
          <em>{description}</em>
          {url}
        </TextLink>
        <ImageLink
          href={url}
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      </Container>
    </Observer>
  );
};
