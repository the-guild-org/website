import { getAllBlogs } from '../../../../lib/all-blogs';
import BlogPage from '../../page';

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  const allBlogs = await getAllBlogs();
  const allTags = new Set(allBlogs.flatMap(art => art.tags));
  return Array.from(allTags).map(tag => ({ tag }));
}

export async function generateMetadata(props: Props) {
  const { tag } = await props.params;
  return {
    title: `Blog - ${tag}`,
    description: 'List of related articles.',
  };
}

export default async function Page(props: Props) {
  const { tag } = await props.params;
  return <BlogPage tag={tag} />;
}
