import { ArrowIcon } from "../icons";
import { Image, StaticImageData } from "../image";
import { NavigationMenuLink } from "./navigation-menu";

export interface GraphQLConfCardProps {
  callToAction?: string;
  description?: string;
  details?: string;
  href?: string;
  image: StaticImageData;
  title?: string;
}
export function GraphQLConfCard({
  callToAction = "Watch The Guild at GraphQLConf 2025",
  description = "The official GraphQL conference hosted by GraphQL Foundation.",
  details = "September 08-10 | Amsterdam, NL",
  href = "https://youtube.com/playlist?list=PL43V96KpNj7MKvDbnyOUrRv0k1gCODtjW&si=nOiETn8J21mYA9pm",
  image,
  title = "GraphQLConf 2025",
}: GraphQLConfCardProps) {
  return (
    <NavigationMenuLink className="group w-[358px]" href={href}>
      <Image alt="" height={200} src={image} width={358} />
      <strong className="mt-6 block text-xl/7 font-medium text-green-1000 dark:text-neutral-100">
        {title}
      </strong>
      <p className="mt-4 text-sm/5 font-medium text-green-800 dark:text-neutral-200">
        {details}
      </p>
      <p className="mt-2 text-sm/5 font-normal text-green-800 dark:text-neutral-200">
        {description}
      </p>
      <span className="mt-6 flex items-center gap-2 rounded-lg font-medium text-green-800 transition-colors group-hover:text-green-1000 dark:text-neutral-200 dark:group-hover:text-neutral-100">
        {callToAction}
        <ArrowIcon />
      </span>
    </NavigationMenuLink>
  );
}
