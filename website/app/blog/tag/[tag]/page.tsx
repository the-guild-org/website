import { getAllBlogs } from '../../../../lib/all-blogs';
import BlogPage from '../../page';

export async function generateStaticParams() {
  const allBlogs = await getAllBlogs();
  const allTags = new Set(allBlogs.flatMap(art => art.tags));
  return Array.from(allTags).map(tag => ({ tag }));
}

type Props = {
  params: Promise<{ tag: string }>;
};

// eslint-disable-next-line import/no-default-export
export default async function Page(props: Props) {
  const { tag } = await props.params;
  return <BlogPage tag={tag} />;
}
