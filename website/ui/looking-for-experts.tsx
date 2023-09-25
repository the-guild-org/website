import { Link } from '@/components';

export function LookingForExperts() {
  return (
    <div className="mt-6 border-l-[3px] border-solid border-[#1cc8ee] bg-gray-100 p-6 font-bold leading-7 text-[#777] dark:bg-gray-900">
      <Link
        href="/blog/announcing-graphql-hive-release"
        title="Announcing GraphQL Hive, the complete GraphQL API manager"
      >
        Announcing GraphQL Hive, the complete GraphQL API manager
      </Link>{' '}
    </div>
  );
}
