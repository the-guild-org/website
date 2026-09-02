"use client";

import * as Primitive from "@radix-ui/react-tabs";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  ComponentPropsWithoutRef,
  createContext,
  FC,
  FocusEvent,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "../cn";
import { useHash } from "../use-hash";

type TabItem = ReactElement | string;

type TabObjectItem = {
  disabled: boolean;
  key?: string;
  label: TabItem;
};

type TabKey = string & { __brand: "TabKey" };
type TabClassNameArgs = {
  disabled: boolean;
  focus: boolean;
  hover: boolean;
  selected: boolean;
};
type TabPanelClassNameArgs = {
  focus: boolean;
};
type ResolvedClassName<Args> = ((args: Args) => string | undefined) | string;

type TabsContextValue = {
  collection: string[];
  id: string;
  items: (TabItem | TabObjectItem)[];
};

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

function isTabObjectItem(item: unknown): item is TabObjectItem {
  return !!item && typeof item === "object" && "label" in item;
}

export interface TabsProps {
  children: ReactNode;
  /** Tabs CSS class name. */
  className?: ResolvedClassName<Record<string, never>>;
  defaultIndex?: number;
  items: (TabItem | TabObjectItem)[];
  onChange?: (index: number) => void;
  /**
   * URLSearchParams key for persisting the selected tab.
   * @default "tab"
   */
  searchParamKey?: string;
  selectedIndex?: number;
  /**
   * LocalStorage key for persisting the selected tab.
   * Set to `true` to use the default key `tabs-${id}`.
   * Leave empty or set to `null` to disable localStorage persistence.
   * Set to a string to use a custom key.
   */
  storageKey?: true | string | null;
  /** Tab CSS class name. */
  tabClassName?: ResolvedClassName<TabClassNameArgs>;
}

export interface TabProps extends Omit<
  ComponentPropsWithoutRef<typeof Primitive.Content>,
  "className" | "forceMount" | "value"
> {
  className?: ResolvedClassName<TabPanelClassNameArgs>;
  unmount?: boolean;
}

export const Tabs = ({
  children,
  className,
  defaultIndex = 0,
  items,
  onChange,
  searchParamKey = "tab",
  selectedIndex: _selectedIndex,
  storageKey = null,
  tabClassName,
}: TabsProps) => {
  const id = useId();

  if (storageKey === true) {
    storageKey = `tabs-${id}`;
  }

  let [selectedIndex, setSelectedIndex] = useState<number>(defaultIndex);
  if (_selectedIndex !== undefined) {
    selectedIndex = _selectedIndex;
  }

  const tabPanelsRef = useRef<HTMLDivElement>(null!);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const tabsContext = useMemo(
    () => ({ collection: [], id, items }),
    [id, items],
  );

  const tabIndexFromSearchParams = useActiveTabFromURL(
    tabPanelsRef,
    items,
    searchParamKey,
    setSelectedIndex,
    id,
  );

  useActiveTabFromStorage(
    storageKey,
    items,
    setSelectedIndex,
    tabIndexFromSearchParams !== -1,
    id,
  );
  const navigate = useNavigate();

  const handleChange = (index: number) => {
    onChange?.(index);

    if (storageKey) {
      const newValue = getTabKey(items, index, id);
      localStorage.setItem(storageKey, newValue);

      // the storage event only get picked up (by the listener) if the localStorage was changed in
      // another browser's tab/window (of the same app), but not within the context of the current tab.
      globalThis.dispatchEvent(
        new StorageEvent("storage", { key: storageKey, newValue }),
      );
    } else {
      setSelectedIndex(index);
    }

    if (searchParamKey) {
      replaceTabSearchParam(searchParamKey, items, id, index, navigate);
    }
  };

  return (
    <Primitive.Root
      defaultValue={getTabKey(items, defaultIndex, id)}
      onValueChange={(value: string) => {
        const index = items.findIndex(
          (_, itemIndex) => getTabKey(items, itemIndex, id) === value,
        );
        if (index !== -1) {
          handleChange(index);
        }
      }}
      value={getTabKey(items, selectedIndex, id)}
    >
      <Primitive.List
        className={cn(
          "nextra-scrollbar overflow-x-auto overflow-y-hidden overscroll-x-contain",
          "mt-4 flex w-full gap-2 pb-px shadow-[inset_0_-1px_0_var(--color-beige-400)] dark:shadow-[inset_0_-1px_0_var(--color-neutral-800)]",
          "focus-visible:hive-focus",
          resolveClassName(className, {}),
        )}
      >
        {items.map((item, index) => (
          <Primitive.Trigger
            className={cn(
              focusedIndex === index && "hive-focus ring-inset",
              "cursor-pointer whitespace-nowrap relative",
              "rounded-t p-2 font-medium leading-5 transition-colors",
              "-mb-px select-none border-b",
              selectedIndex === index
                ? "border-current outline-hidden"
                : hoveredIndex === index
                  ? "border-beige-400 dark:border-neutral-800"
                  : "border-transparent",
              selectedIndex === index
                ? "text-green-900 dark:text-primary"
                : isTabObjectItem(item) && item.disabled
                  ? "pointer-events-none text-beige-600 dark:text-neutral-600"
                  : hoveredIndex === index
                    ? "text-black dark:text-white"
                    : "text-beige-800 dark:text-beige-200",
              resolveClassName(tabClassName, {
                disabled: isTabObjectItem(item) && item.disabled,
                focus: focusedIndex === index,
                hover: hoveredIndex === index,
                selected: selectedIndex === index,
              }),
            )}
            disabled={isTabObjectItem(item) && item.disabled}
            key={index}
            onBlur={() => {
              setFocusedIndex((current) =>
                current === index ? null : current,
              );
            }}
            onFocus={() => {
              setFocusedIndex(index);
            }}
            onMouseEnter={() => {
              setHoveredIndex(index);
            }}
            onMouseLeave={() => {
              setHoveredIndex((current) =>
                current === index ? null : current,
              );
            }}
            value={getTabKey(items, index, id)}
          >
            {isTabObjectItem(item) ? item.label : item}
          </Primitive.Trigger>
        ))}
      </Primitive.List>
      <TabsContext.Provider value={tabsContext}>
        <div ref={tabPanelsRef}>{children}</div>
      </TabsContext.Provider>
    </Primitive.Root>
  );
};

export const Tab: FC<TabProps> = ({
  children,
  // For SEO display all the Panel in the DOM and set `display: none;` for those that are not selected
  className,
  unmount = false,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const { collection, id, items } = useTabsContext();
  const index = useCollectionIndex(collection);
  const value = getTabKey(items, index, id);

  return (
    <Primitive.Content
      {...props}
      className={cn(
        "mt-[1.25em] rounded-sm",
        focused && "hive-focus",
        !unmount && "data-[state=inactive]:hidden",
        resolveClassName(className, { focus: focused }),
      )}
      data-tab-index={index}
      forceMount={unmount ? undefined : true}
      onBlur={(event: FocusEvent<HTMLDivElement>) => {
        props["onBlur"]?.(event);
        setFocused(false);
      }}
      onFocus={(event: FocusEvent<HTMLDivElement>) => {
        props["onFocus"]?.(event);
        setFocused(true);
      }}
      value={value}
    >
      {children}
    </Primitive.Content>
  );
};

function useActiveTabFromURL(
  tabPanelsRef: React.RefObject<HTMLDivElement>,
  items: (TabItem | TabObjectItem)[],
  searchParamKey: string,
  setSelectedIndex: (index: number) => void,
  id: string,
) {
  const hash = useHash();
  const { searchStr } = useLocation();
  const searchParams = new URLSearchParams(searchStr);
  const tabsInSearchParams = searchParams
    .getAll(searchParamKey)
    .flatMap((v) => v.split(","))
    .sort();

  const tabIndexFromSearchParams = items.findIndex((_, index) =>
    tabsInSearchParams.includes(getTabKey(items, index, id)),
  );

  useIsomorphicLayoutEffect(() => {
    const tabPanel = hash
      ? findTabPanelByHash(tabPanelsRef.current, hash)
      : null;

    if (tabPanel) {
      let index = 0;
      for (const el of tabPanelsRef.current!.children) {
        if (el === tabPanel) {
          setSelectedIndex(Number(index));
          // Note for posterity:
          //   We still need to scroll to the hash target after switching the hidden panel,
          //   but clearing/restoring `location.hash` interferes with ToC state.
          //
          //   Instead, switch the panel first and then scroll the revealed target directly.
          requestAnimationFrame(() => {
            scrollHashTargetIntoView(hash);
          });
        }
        index++;
      }
    } else if (tabIndexFromSearchParams !== -1) {
      // if we don't have content to scroll to, we look at the search params
      setSelectedIndex(tabIndexFromSearchParams);
    }
    // tabPanelsRef is a ref, so it's not a dependency
  }, [hash, tabsInSearchParams.join(",")]);

  return tabIndexFromSearchParams;
}

function useActiveTabFromStorage(
  storageKey: string | null,
  items: (TabItem | TabObjectItem)[],
  setSelectedIndex: (index: number) => void,
  ignoreLocalStorage: boolean,
  id: string,
) {
  useIsomorphicLayoutEffect(() => {
    if (!storageKey || ignoreLocalStorage) {
      // Do not listen storage events if there is no storage key
      return;
    }

    // eslint-disable-next-line unicorn/consistent-function-scoping -- needs closure over items, id, setSelectedIndex
    const setSelectedTab = (key: string) => {
      const index = items.findIndex((_, i) => getTabKey(items, i, id) === key);
      if (index !== -1) {
        setSelectedIndex(index);
      }
    };

    function onStorageChange(event: StorageEvent) {
      if (event.key === storageKey) {
        const value = event.newValue;
        if (value) {
          setSelectedTab(value);
        }
      }
    }

    const value = localStorage.getItem(storageKey);
    if (value) {
      setSelectedTab(value);
    }

    globalThis.addEventListener("storage", onStorageChange);
    return () => {
      globalThis.removeEventListener("storage", onStorageChange);
    };
  }, [storageKey, items, setSelectedIndex, id]);
}

function getTabKey(
  items: (TabItem | TabObjectItem)[],
  index: number,
  prefix: string,
): TabKey {
  const item = items[index];
  const isObject = isTabObjectItem(item);
  // if the key is defined by user, we use it
  if (isObject && item.key) {
    return item.key as TabKey;
  }
  const label = isObject ? item.label : item;
  // otherwise we use the slugified label prefixed by the tab group id, if the label is a string
  // or the index of the item in the items array prefixed by the tab group id if the label is a ReactElement
  const key =
    typeof label === "string"
      ? slugify(label)
      : `${prefix}-${index.toString()}`;
  return key as TabKey;
}

function slugify(label: string) {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036F]/g, "") // strip accents
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
}

function useTabsContext() {
  const value = useContext(TabsContext);
  if (!value) {
    throw new Error("useTabsContext must be used within Tabs");
  }
  return value;
}

function useCollectionIndex(collection: string[]) {
  const key = useId();

  useEffect(() => {
    return () => {
      const index = collection.indexOf(key);
      if (index !== -1) {
        collection.splice(index, 1);
      }
    };
  }, [collection, key]);

  if (!collection.includes(key)) {
    collection.push(key);
  }

  return collection.indexOf(key);
}

function resolveClassName<Args>(
  className: ResolvedClassName<Args> | undefined,
  args: Args,
) {
  return typeof className === "function" ? className(args) : className;
}

function replaceTabSearchParam(
  searchParamKey: string,
  items: (TabItem | TabObjectItem)[],
  id: string,
  selectedIndex?: number,
  navigate?: ReturnType<typeof useNavigate>,
) {
  if (navigate) {
    // Use TanStack Router's navigate to avoid scroll reset.
    // Raw history.replaceState gets monkey-patched by the router
    // and triggers scrollRestoration.

    void navigate({
      replace: true,
      resetScroll: false,
      search: ((prev: Record<string, unknown>) => {
        const raw = prev?.[searchParamKey];
        const tabKeys = new Set(
          typeof raw === "string"
            ? raw.split(",")
            : Array.isArray(raw)
              ? raw
              : [],
        );

        // remove only tabs belonging to this tab group
        for (let i = 0; i < items.length; i++) {
          tabKeys.delete(getTabKey(items, i, id));
        }

        // add the clicked tab
        if (selectedIndex !== undefined) {
          tabKeys.add(getTabKey(items, selectedIndex, id));
        }

        const values = [...tabKeys];
        return {
          ...prev,
          [searchParamKey]: values.length > 0 ? values.join(",") : undefined,
        };
      }) as unknown as true,
    });
  } else {
    const searchParams = new URLSearchParams(globalThis.location.search);
    const tabKeys = new Set(searchParams.getAll(searchParamKey));

    // we remove only tabs from this list from search params
    for (let i = 0; i < items.length; i++) {
      tabKeys.delete(getTabKey(items, i, id));
    }

    // we add tabs from outside of this list back
    searchParams.delete(searchParamKey);
    for (const key of tabKeys) {
      searchParams.append(searchParamKey, key);
    }

    // and finally, we add the clicked tab
    if (selectedIndex !== undefined) {
      searchParams.append(searchParamKey, getTabKey(items, selectedIndex, id));
    }

    const url = `${globalThis.location.pathname}${searchParams.size > 0 ? `?${searchParams.toString()}` : ""}${globalThis.location.hash}`;
    const currentURL = `${globalThis.location.pathname}${globalThis.location.search}${globalThis.location.hash}`;
    if (currentURL === url) {
      return;
    }

    // Fallback for cleanup effects where navigate isn't available.
    globalThis.history.replaceState(null, "", url);
  }
}

function findTabPanelByHash(tabPanelsRef: HTMLDivElement | null, hash: string) {
  if (!tabPanelsRef) {
    return null;
  }

  const escapedHash = escapeSelector(hash);
  for (const el of tabPanelsRef.children) {
    if (
      el instanceof HTMLElement &&
      (el.id === hash || el.querySelector(`[id="${escapedHash}"]`))
    ) {
      return el;
    }
  }

  return null;
}

function scrollHashTargetIntoView(hash: string) {
  if (!hash) {
    return;
  }

  globalThis.document.getElementById(hash)?.scrollIntoView();
}

function escapeSelector(value: string) {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(value);
  }

  return value.replaceAll(/["\\]/g, String.raw`\$&`);
}

const useIsomorphicLayoutEffect =
  globalThis.window === undefined ? useEffect : useLayoutEffect;
