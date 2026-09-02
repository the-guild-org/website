import { HTMLAttributes } from "react";

import { cn } from "./cn";
import { Heading } from "./heading";
import { ArrowIcon } from "./icons";
import { MainProductCard } from "./product-card";
import { FIVE_MAIN_PRODUCTS } from "./products";
import { TextLink } from "./text-link";

export interface ExploreMainProductCardsProps extends HTMLAttributes<HTMLDivElement> {
  isHive?: boolean;
}

export function ExploreMainProductCards({
  className,
  isHive,
  ...rest
}: ExploreMainProductCardsProps) {
  return (
    <section
      className={cn(
        "relative isolate flex flex-wrap gap-6 px-4 py-6 lg:gap-12 lg:py-24 xl:px-[120px]",
        className,
      )}
      {...rest}
    >
      <div className="[@media(min-width:1490px)]:w-[293px]">
        <Heading as="h2" className="text-pretty" size="xs">
          Explore Hive 360° GraphQL Ecosystem to reach full potential
        </Heading>
        <TextLink
          className="mt-4 text-green-800 lg:mt-6"
          href={
            isHive
              ? "/ecosystem"
              : "https://the-guild.dev/graphql/hive/ecosystem"
          }
        >
          Learn more
          <ArrowIcon />
        </TextLink>
      </div>
      <ul className="nextra-scrollbar -mx-12 -my-2 flex shrink-0 grow gap-[22px] overflow-auto px-12 py-2 [@media(max-width:1490px)]:w-full [@media(min-width:1490px)]:overflow-visible [&>:nth-child(n+5)]:[@media(min-width:1490px)]:hidden">
        {FIVE_MAIN_PRODUCTS.map((product) => (
          <MainProductCard as="li" key={product.name} product={product} />
        ))}
      </ul>
    </section>
  );
}
