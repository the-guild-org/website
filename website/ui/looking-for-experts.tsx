import { Link } from '@/components';

export function LookingForExperts() {
  return (
    <div className="mt-6 border-l-[3px] border-solid border-[#1cc8ee] bg-gray-100 p-6 font-bold leading-7 text-[#777] dark:bg-gray-900">
      <Link
        href="https://graphql.org/conf/"
        title="Announcing GraphQL Hive, the complete GraphQL API manager"
      >
        GraphQL Conf will take place in 19-21 of September 2023 in San-Francisco. Get your tickets
        now!
      </Link>{' '}
    </div>
  );
}
