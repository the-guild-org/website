import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { hiveThemeDecorator } from "../__storybook__/hive-theme-decorator";
import { CallToAction } from "../call-to-action";
import { Tabs, TabsProps } from "./index";

export default {
  title: "Components/Tabs",
  component: Tabs,
  decorators: [hiveThemeDecorator],
  parameters: {
    padding: true,
    nextjs: {
      appDirectory: true,
      navigation: {
        query: {
          tab: "",
        },
      },
    },
  },
  argTypes: {
    items: {
      control: "object",
      description: "Array of tab labels (strings or React elements)",
    },
    defaultIndex: {
      control: "number",
      description: "Default selected tab index",
    },
    storageKey: {
      control: "text",
      description: "localStorage key for persisting the selected tab",
    },
  },
} satisfies Meta<TabsProps>;

type Story = StoryObj<TabsProps>;

/**
 * Basic tabs with package manager examples
 */
export const Basic: Story = {
  args: {
    items: ["pnpm", "npm", "yarn"],
    children: (
      <>
        <Tabs.Tab>
          <strong>pnpm</strong>: Fast, disk space efficient package manager.
          <pre>
            <code>pnpm install</code>
          </pre>
        </Tabs.Tab>
        <Tabs.Tab>
          <strong>npm</strong> is a package manager for the JavaScript
          programming language.
          <pre>
            <code>npm install</code>
          </pre>
        </Tabs.Tab>
        <Tabs.Tab>
          <strong>Yarn</strong> used to have funny emojis and then it had a lot
          of major versions.
          <pre>
            <code>yarn install</code>
          </pre>
        </Tabs.Tab>
      </>
    ),
  },
};

/**
 * Tabs with a default selected index
 */
export const WithDefaultIndex: Story = {
  args: {
    items: ["pnpm", "npm", "yarn"],
    defaultIndex: 1,
    children: (
      <>
        <Tabs.Tab>pnpm content</Tabs.Tab>
        <Tabs.Tab>npm content (default selected)</Tabs.Tab>
        <Tabs.Tab>yarn content</Tabs.Tab>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that the second tab is selected by default
    const npmTab = canvas.getByRole("tab", { name: "npm" });
    await expect(npmTab).toHaveAttribute("aria-selected", "true");

    // Check that the npm content is visible
    const npmContent = canvas.getByText("npm content (default selected)");
    await expect(npmContent).toBeVisible();
  },
};

/**
 * Tabs with disabled items
 */
export const WithDisabledTabs: Story = {
  args: {
    items: [
      "Active Tab",
      { label: "Disabled Tab", disabled: true },
      "Another Active Tab",
    ],
    children: (
      <>
        <Tabs.Tab>Content for active tab</Tabs.Tab>
        <Tabs.Tab>Content for disabled tab</Tabs.Tab>
        <Tabs.Tab>Content for another active tab</Tabs.Tab>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that the disabled tab has the correct attribute
    const disabledTab = canvas.getByRole("tab", { name: "Disabled Tab" });
    await expect(disabledTab).toHaveAttribute("disabled", "");

    // Try to click the disabled tab - it should not become selected

    const activeTab = canvas.getByRole("tab", { name: "Active Tab" });
    await expect(activeTab).toHaveAttribute("aria-selected", "true");
  },
};

/**
 * Test tab switching interaction
 */
export const TabSwitching: Story = {
  args: {
    items: ["First", "Second", "Third"],
    onChange: fn(),
    children: (
      <>
        <Tabs.Tab>First panel content</Tabs.Tab>
        <Tabs.Tab>Second panel content</Tabs.Tab>
        <Tabs.Tab>Third panel content</Tabs.Tab>
      </>
    ),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const secondTab = canvas.getByRole("tab", { name: "Second" });
    await userEvent.click(secondTab);

    await expect(args.onChange).toHaveBeenCalledWith(1);
    await expect(secondTab).toHaveAttribute("aria-selected", "true");

    const thirdTab = canvas.getByRole("tab", { name: "Third" });
    await userEvent.click(thirdTab);

    await expect(args.onChange).toHaveBeenCalledWith(2);
    await expect(canvas.getByText("Third panel content")).toBeVisible();
    await expect(thirdTab).toHaveAttribute("aria-selected", "true");
  },
};

/**
 * Test URL search params synchronization
 * This tests the complex logic of syncing tab state with URLSearchParams
 */
export const URLSearchParamsSync: Story = {
  args: {
    items: ["react", "vue", "angular"],
    searchParamKey: "framework",
    children: (
      <>
        <Tabs.Tab>
          React is a JavaScript library for building user interfaces.
        </Tabs.Tab>
        <Tabs.Tab>Vue.js is a progressive JavaScript framework.</Tabs.Tab>
        <Tabs.Tab>
          Angular is a platform for building mobile and desktop web
          applications.
        </Tabs.Tab>
      </>
    ),
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        query: {
          framework: "vue",
        },
      },
    },
  },
};

/**
 * Test localStorage persistence
 * This tests the complex logic of syncing tab state across browser tabs/windows
 */
export const LocalStoragePersistence: Story = {
  args: {
    items: ["Tab 1", "Tab 2", "Tab 3"],
    storageKey: "test-tabs-storage",
    children: (
      <>
        <Tabs.Tab>Content 1</Tabs.Tab>
        <Tabs.Tab>Content 2</Tabs.Tab>
        <Tabs.Tab>Content 3</Tabs.Tab>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Clear localStorage first
    localStorage.removeItem("test-tabs-storage");

    // Click on Tab 2
    const tab2 = canvas.getByRole("tab", { name: "Tab 2" });
    await userEvent.click(tab2);

    // Check that the value was stored in localStorage (slugified key)
    const storedValue = localStorage.getItem("test-tabs-storage");
    await expect(storedValue).toBe("tab-2");

    // Simulate storage event from another tab/window
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "test-tabs-storage",
        newValue: "tab-3",
      }),
    );

    // Wait a bit for the effect to trigger
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Tab 3 should now be selected
    const tab3 = canvas.getByRole("tab", { name: "Tab 3" });
    await expect(tab3).toHaveAttribute("aria-selected", "true");

    // Clean up
    localStorage.removeItem("test-tabs-storage");
  },
};

/**
 * Tabs with custom keys
 * Tests the custom key feature for tab identification
 */
export const WithCustomKeys: Story = {
  args: {
    items: [
      { label: "Getting Started", key: "intro", disabled: false },
      { label: "API Reference", key: "api", disabled: false },
      { label: "Examples", key: "examples", disabled: false },
    ],
    searchParamKey: "section",
    children: (
      <>
        <Tabs.Tab>Introduction and getting started guide</Tabs.Tab>
        <Tabs.Tab>Complete API documentation</Tabs.Tab>
        <Tabs.Tab>Code examples and tutorials</Tabs.Tab>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Clear search params
    const url = new URL(window.location.href);
    url.searchParams.delete("section");
    window.history.replaceState(null, "", url.toString());

    // Click on API Reference
    const apiTab = canvas.getByRole("tab", { name: "API Reference" });
    await userEvent.click(apiTab);

    // URL should use the custom key 'api' instead of slugified label
    await expect(window.location.search).toContain("section=api");

    // Click on Examples
    const examplesTab = canvas.getByRole("tab", { name: "Examples" });
    await userEvent.click(examplesTab);

    await expect(window.location.search).toContain("section=examples");
  },
};

/**
 * Test controlled mode
 * Tabs can be controlled externally via selectedIndex prop
 */
export const ControlledMode: Story = {
  render: function ControlledTabs() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
      <div>
        <div className="mb-4 flex gap-2">
          <CallToAction onClick={() => setSelectedIndex(0)} variant="tertiary">
            Select Tab 1
          </CallToAction>
          <CallToAction onClick={() => setSelectedIndex(1)} variant="tertiary">
            Select Tab 2
          </CallToAction>
          <CallToAction onClick={() => setSelectedIndex(2)} variant="tertiary">
            Select Tab 3
          </CallToAction>
        </div>
        <Tabs
          items={["Tab 1", "Tab 2", "Tab 3"]}
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
        >
          <Tabs.Tab>Content 1</Tabs.Tab>
          <Tabs.Tab>Content 2</Tabs.Tab>
          <Tabs.Tab>Content 3</Tabs.Tab>
        </Tabs>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initially Tab 1 should be selected
    const tab1 = canvas.getByRole("tab", { name: "Tab 1" });
    await expect(tab1).toHaveAttribute("aria-selected", "true");

    // Click external button to select Tab 2
    const selectTab2Button = canvas.getByRole("button", {
      name: "Select Tab 2",
    });
    await userEvent.click(selectTab2Button);

    // Tab 2 should now be selected
    const tab2 = canvas.getByRole("tab", { name: "Tab 2" });
    await expect(tab2).toHaveAttribute("aria-selected", "true");

    // Click on Tab 3 directly
    const tab3 = canvas.getByRole("tab", { name: "Tab 3" });
    await userEvent.click(tab3);

    // Tab 3 should now be selected
    await expect(tab3).toHaveAttribute("aria-selected", "true");

    // Use external button to go back to Tab 1
    const selectTab1Button = canvas.getByRole("button", {
      name: "Select Tab 1",
    });
    await userEvent.click(selectTab1Button);

    await expect(tab1).toHaveAttribute("aria-selected", "true");
  },
};

/**
 * Tabs with React elements as labels
 */
export const WithReactElementLabels: Story = {
  args: {
    searchParamKey: "benefit",
    items: [
      <span key="1" className="flex items-center gap-2">
        🚀 Fast
      </span>,
      <span key="2" className="flex items-center gap-2">
        🔒 Secure
      </span>,
      <span key="3" className="flex items-center gap-2">
        📦 Reliable
      </span>,
    ],
    children: (
      <>
        <Tabs.Tab>Lightning-fast performance</Tabs.Tab>
        <Tabs.Tab>Enterprise-grade security</Tabs.Tab>
        <Tabs.Tab>99.9% uptime SLA</Tabs.Tab>
      </>
    ),
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        query: {
          benefit: ":r0:-2",
        },
      },
    },
  },
};

/**
 * Many tabs with horizontal scrolling
 */
export const ManyTabs: Story = {
  args: {
    items: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Rust",
      "Go",
      "Java",
      "C++",
      "Ruby",
      "PHP",
      "Swift",
    ],
    defaultIndex: 4,
    children: (
      <>
        <Tabs.Tab>JavaScript content</Tabs.Tab>
        <Tabs.Tab>TypeScript content</Tabs.Tab>
        <Tabs.Tab>Python content</Tabs.Tab>
        <Tabs.Tab>Rust content</Tabs.Tab>
        <Tabs.Tab>Go content</Tabs.Tab>
        <Tabs.Tab>Java content</Tabs.Tab>
        <Tabs.Tab>C++ content</Tabs.Tab>
        <Tabs.Tab>Ruby content</Tabs.Tab>
        <Tabs.Tab>PHP content</Tabs.Tab>
        <Tabs.Tab>Swift content</Tabs.Tab>
      </>
    ),
  },
};

/**
 * Tabs with custom styling
 */
export const CustomStyling: Story = {
  args: {
    items: ["Design", "Develop", "Deploy"],
    className: "border-b-4 gap-0.5 border-green-800",
    tabClassName: (args) =>
      args.selected
        ? "bg-green-800 text-white rounded-t-none"
        : "bg-gray-100 text-gray-700 rounded-t-none",
    children: (
      <>
        <Tabs.Tab>Design your application</Tabs.Tab>
        <Tabs.Tab>Develop with modern tools</Tabs.Tab>
        <Tabs.Tab>Deploy to production</Tabs.Tab>
      </>
    ),
  },
};

export const TabsSyncedWithStorageEvents: Story = {
  args: {
    items: ["Tab 1", "Tab 2", "Tab 3"],
    storageKey: "test-tabs-storage",
    searchParamKey: "package-manager",
  },
  render() {
    return (
      <div>
        <Tabs items={["pnpm", "npm", "yarn"]} storageKey="packageManager">
          {["pnpm", "npm", "yarn"].map((item) => (
            <Tabs.Tab key={item}>{item}</Tabs.Tab>
          ))}
        </Tabs>
        <Tabs items={["pnpm", "npm", "yarn"]} storageKey="packageManager">
          {["pnpm", "npm", "yarn"].map((item) => (
            <Tabs.Tab key={item}>{item}</Tabs.Tab>
          ))}
        </Tabs>
        <hr className="my-8" />
        This one doesn't have a `storageKey`, so it's not connected:
        <Tabs items={["pnpm", "npm", "yarn"]}>
          {["pnpm", "npm", "yarn"].map((item) => (
            <Tabs.Tab key={item}>{item}</Tabs.Tab>
          ))}
        </Tabs>
      </div>
    );
  },
};

export const ContentInHiddenPanelOpensByHash: Story = {
  args: {
    items: ["Docker", "Binary"],
    children: (
      <>
        <Tabs.Tab>
          <CallToAction href="#binary" variant="tertiary">
            Navigate to #binary
          </CallToAction>
        </Tabs.Tab>
        <Tabs.Tab>
          <div id="binary">Binary</div>
        </Tabs.Tab>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const url = new URL(window.location.href);
    url.hash = "";
    window.history.replaceState(null, "", url.toString());

    const link = canvas.getByRole("link", { name: "Navigate to #binary" });
    await userEvent.click(link);

    await expect(window.location.hash).toBe("#binary");
    await expect(
      canvas.getByRole("tabpanel", { name: "Binary" }),
    ).toBeVisible();
  },
};

export const KeepsHashWhenChangingTabs: Story = {
  args: {
    items: ["Docker", "Binary"],
    children: (
      <>
        <Tabs.Tab>
          <CallToAction href="#binary" variant="tertiary">
            Navigate to #binary
          </CallToAction>
        </Tabs.Tab>
        <Tabs.Tab>
          <div id="binary">Binary</div>
        </Tabs.Tab>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const url = new URL(window.location.href);
    url.hash = "";
    window.history.replaceState(null, "", url.toString());

    await userEvent.click(
      canvas.getByRole("link", { name: "Navigate to #binary" }),
    );
    await expect(window.location.hash).toBe("#binary");

    await userEvent.click(canvas.getByRole("tab", { name: "Docker" }));
    await expect(window.location.hash).toBe("#binary");
  },
};

export const UnmountCleanupPreservesHash: Story = {
  args: {
    items: ["Overview", "API Reference"],
    searchParamKey: "section",
    children: (
      <>
        <Tabs.Tab>Overview content</Tabs.Tab>
        <Tabs.Tab>API Reference content</Tabs.Tab>
      </>
    ),
  },
  render(args) {
    const [mounted, setMounted] = React.useState(true);

    return (
      <div className="space-y-4">
        <CallToAction href="#outside-hash" variant="tertiary">
          Navigate to #outside-hash
        </CallToAction>
        <CallToAction onClick={() => setMounted(false)} variant="tertiary">
          Unmount Tabs
        </CallToAction>
        {mounted ? <Tabs {...args} /> : null}
        <div id="outside-hash">Outside hash target</div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("tab", { name: "API Reference" }));
    await expect(window.location.search).toContain("section=api-reference");

    await userEvent.click(
      canvas.getByRole("link", { name: "Navigate to #outside-hash" }),
    );
    await expect(window.location.hash).toBe("#outside-hash");

    await userEvent.click(canvas.getByRole("button", { name: "Unmount Tabs" }));
    await expect(window.location.search).not.toContain("section=");
    await expect(window.location.hash).toBe("#outside-hash");
  },
};

export const MultipleTabsInParams: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        query: "tab=shrimp&tab=brown-rice&tab=mango&tab=ponzu",
      },
    },
  },
  render() {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <span className="text-sm font-medium">Protein</span>
          <Tabs storageKey={null} items={["Salmon", "Tuna", "Tofu", "Shrimp"]}>
            <Tabs.Tab>🐟</Tabs.Tab>
            <Tabs.Tab>🐠</Tabs.Tab>
            <Tabs.Tab>🧈</Tabs.Tab>
            <Tabs.Tab>🦐</Tabs.Tab>
          </Tabs>
        </div>

        <div>
          <span className="text-sm font-medium">Base</span>
          <Tabs
            storageKey={null}
            items={[
              "White Rice",
              "Brown Rice",
              "Mixed Greens",
              "Zucchini Noodles",
            ]}
          >
            <Tabs.Tab>🍚</Tabs.Tab>
            <Tabs.Tab>🍘</Tabs.Tab>
            <Tabs.Tab>🥬</Tabs.Tab>
            <Tabs.Tab>🥒</Tabs.Tab>
          </Tabs>
        </div>

        <div>
          <span className="text-sm font-medium">Toppings</span>
          <Tabs
            storageKey={null}
            items={["Edamame", "Avocado", "Cucumber", "Mango"]}
          >
            <Tabs.Tab>🫘</Tabs.Tab>
            <Tabs.Tab>🥑</Tabs.Tab>
            <Tabs.Tab>🥒</Tabs.Tab>
            <Tabs.Tab>🥭</Tabs.Tab>
          </Tabs>
        </div>

        <div>
          <span className="text-sm font-medium">Sauce</span>
          <Tabs
            storageKey={null}
            items={["Soy Sauce", "Ponzu", "Spicy Mayo", "Sesame Ginger"]}
          >
            <Tabs.Tab>🍶</Tabs.Tab>
            <Tabs.Tab>🍋</Tabs.Tab>
            <Tabs.Tab>🌶️</Tabs.Tab>
            <Tabs.Tab>🫚</Tabs.Tab>
          </Tabs>
        </div>
      </div>
    );
  },
};
