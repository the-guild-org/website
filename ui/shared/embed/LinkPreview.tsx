import { ReactElement, useEffect, useLayoutEffect, useState } from 'react';
import { styled } from '../../../stitches.config';
import { Link } from '../../components';
import { Observer } from '../Observer';

type PreviewData = {
  description: string;
  url: string;
  image: string;
  title: string;
} | null;

async function fetchPreview(url: string): Promise<PreviewData> {
  try {
    const result = await fetch(`/api/link-preview?url=${url}`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    return result.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

const Container = styled('div', {
  display: 'table',
  width: '100%',
  marginTop: 45,
  marginBottom: 45,
  maxHeight: 280,
  boxSizing: 'border-box',
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.04), inset 0 0 0 1px rgba(0, 0, 0, 0.09)`,
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

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' && window.document?.createElement ? useLayoutEffect : useEffect;

export const LinkPreview = ({ link }: { link: string }): ReactElement => {
  const [data, setData] = useState<PreviewData>(null);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const fetchData = async () => {
      const absoluteLink = link.startsWith('/') ? `https://the-guild.dev${link}` : link;
      const previewData = await fetchPreview(absoluteLink);

      setData(previewData);
    };

    fetchData();
  }, []);

  if (!data) {
    return <Link href={link}>{link}</Link>;
  }

  return (
    <Observer>
      <Container>
        <TextLink href={link}>
          <strong>{data.title}</strong>
          <em>{data.description}</em>
          {data.url}
        </TextLink>
        <ImageLink
          href={link}
          style={{
            backgroundImage: `url(${data.image})`,
          }}
        />
      </Container>
    </Observer>
  );
};
