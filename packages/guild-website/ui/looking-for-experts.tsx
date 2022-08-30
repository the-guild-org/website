import { Link } from '@/components';

export function LookingForExperts() {
  return (
    <div className="mt-6 border-l-[3px] border-solid border-[#1cc8ee] bg-gray-100 p-6 leading-7 text-[#777] dark:bg-gray-900">
      Looking for experts? We offer consulting and trainings.
      <br />
      Explore{' '}
      <Link href="/services" title="Explore our services. Consulting and Trainings.">
        our services
      </Link>{' '}
      and get in touch.
    </div>
  );
}
