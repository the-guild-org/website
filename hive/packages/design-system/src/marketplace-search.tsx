"use client";

import fuzzy from "fuzzy";
import { isValidElement, ReactElement, useMemo, useState } from "react";

import { cn } from "./cn";
import { Heading } from "./heading";
import { CloseIcon, SearchIcon } from "./icons";
import { MarketplaceList } from "./marketplace-list";
import { Tabs } from "./tabs";
import { Tag, TagsContainer } from "./tag";
import {
  IMarketplaceListProps,
  IMarketplaceSearchProps,
} from "./types/components";

const renderQueryPlaceholder = (
  placeholder: ReactElement | string,
  query: string,
) => {
  if (!query || isValidElement(placeholder)) {
    return placeholder;
  }
  const subStrings = (placeholder as string).split("{query}");
  return (
    <>
      {subStrings[0]} <strong>"{query}"</strong> {subStrings[1]}
    </>
  );
};

export const MarketplaceSearch = ({
  className,
  colorScheme = "neutral",
  placeholder,
  primaryList,
  queryList,
  secondaryList,
  tagsFilter,
  title,
}: IMarketplaceSearchProps): ReactElement => {
  const [query, setQuery] = useState("");

  const handleTagClick = (tagName: string) => {
    if (query.includes(`#${tagName}`)) {
      setQuery(query.replace(`#${tagName}`, "").trim());
    } else {
      setQuery((prev) => `${prev} #${tagName}`);
    }
  };

  const items = useMemo(() => {
    if (query && queryList) {
      const tags = query
        .split(/\s+/)
        .filter((e) => e.startsWith("#"))
        .map((e) => e.replace("#", ""));
      // Filter by tags
      let filteredItems = queryList.items;
      if (tags.length > 0) {
        filteredItems = queryList.items.filter((item) =>
          tags.every((e) => item.tags?.includes(e)),
        );
      }
      const matchedResults = new Set(
        fuzzy
          .filter(
            // Removes tags and all special characters from the query string for better fuzzy matching
            // query
            query
              .replaceAll(/#\w+/gi, "")
              .replaceAll(/[^\w\s]/gi, "")
              .trim(),
            // Mapping the queryList items into a list of strings including the titles
            filteredItems.map((e) => e.title),
          )
          .map((e) => e.original.toLowerCase()),
      );

      return queryList.items.filter((e) =>
        matchedResults.has(e.title.toLowerCase()),
      );
    }
    return;
  }, [query, queryList]);

  return (
    <section
      className={cn(
        // --bg and --fg are defined in style.css under .MarketplaceSearch
        "MarketplaceSearch",
        colorScheme,
        "bg-(--bg)",
        className,
      )}
    >
      <div className="container max-w-360 py-12">
        <Heading as="h1" className="mb-4 text-[32px] text-(--fg)" size="sm">
          {title}
        </Heading>
        {tagsFilter && (
          <TagsContainer focusgroup="horizontal">
            {tagsFilter.map((tagName, i) => (
              <Tag
                key={tagName}
                onClick={() => handleTagClick(tagName)}
                selected={query.includes(`#${tagName}`)}
                tabIndex={i === 0 ? 0 : -1}
              >
                {tagName}
              </Tag>
            ))}
          </TagsContainer>
        )}
        <MarketplaceSearchInput
          className="mt-4"
          onChange={setQuery}
          placeholder={placeholder}
          value={query}
        />

        {items && queryList ? (
          <MarketplaceList
            colorScheme={colorScheme}
            items={items}
            pagination={queryList.pagination}
            placeholder={renderQueryPlaceholder(queryList.placeholder, query)}
            title={queryList.title}
          />
        ) : (
          <MarketplaceSearchTabs
            className="mt-8"
            colorScheme={colorScheme}
            tabs={[primaryList, secondaryList]}
          />
        )}
      </div>
    </section>
  );
};

function MarketplaceSearchInput({
  className,
  onChange,
  placeholder,
  value,
}: {
  className?: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}) {
  return (
    <div className="border-b border-(--fg-60)">
      <div
        className={cn(
          "hive-focus-within flex items-center rounded-sm px-2",
          className,
        )}
      >
        <SearchIcon className="text-(--fg-80)" />
        <input
          className="ml-2 w-full border-0 bg-transparent py-2 font-medium text-(--fg) outline-hidden placeholder:text-(--fg-60) [&::-webkit-search-cancel-button]:hidden"
          onChange={(event) => onChange(event.currentTarget.value)}
          placeholder={placeholder}
          type="search"
          value={value}
        />
        <button
          aria-label="Clear input"
          className="flex size-6 items-center justify-center rounded-xs [input:placeholder-shown+&]:hidden"
          onClick={() => onChange("")}
          // A builtin clear-button can't be tabbed to. A keyboard user can cmd+A and delete.
          tabIndex={-1}
        >
          <CloseIcon className="size-5 text-(--fg-80)" />
        </button>
      </div>
    </div>
  );
}

function MarketplaceSearchTabs({
  className,
  colorScheme,
  tabs: lists,
}: {
  className?: string;
  colorScheme: "green" | "neutral";
  tabs: (IMarketplaceListProps | undefined)[];
}) {
  const items = lists.filter(
    (list): list is IMarketplaceListProps & { title: string } =>
      list?.title != null,
  );

  return (
    <div className={className}>
      <Tabs
        className="grid grid-cols-2 gap-1 rounded-2xl border-none bg-neutral-800 in-[.green]:bg-green-900! in-[.light]:bg-neutral-100 in-[.light]:text-green-200"
        items={items.map((list) => list.title)}
        tabClassName={cn(
          "rounded-2xl border-none p-3 text-sm font-medium text-neutral-200 hover:bg-neutral-700/50 hover:text-white aria-selected:cursor-default! aria-selected:bg-[--fg]! aria-selected:text-[--bg]! sm:p-4 sm:text-base in-[.green]:bg-green-900! in-[.green]:text-green-200! in-[.green]:hover:bg-green-700/25! in-[.green]:hover:text-green-100! in-[.green]:aria-selected:bg-green-300! in-[.green]:aria-selected:text-green-800! in-[.light]:bg-neutral-100 in-[.light]:text-neutral-800 in-[.light]:hover:bg-neutral-200/80 in-[.light]:hover:text-neutral-900",
        )}
      >
        {items.map((list, i) => (
          <Tabs.Tab key={i} tabIndex={-1}>
            <MarketplaceList
              {...list}
              colorScheme={colorScheme}
              // title is part of the `list` and we clear it here, as it's already rendered in a tab
              title={undefined}
            />
          </Tabs.Tab>
        ))}
      </Tabs>
    </div>
  );
}
