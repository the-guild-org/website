import { Meta, StoryObj } from "@storybook/react";
import { hiveThemeDecorator } from "../__storybook__/hive-theme-decorator";
import { ComparisonTableProps, ComparisonTable as Table } from "./index";

export default {
  title: "Components/Table",
  component: Table,
  decorators: [hiveThemeDecorator],
  parameters: {
    padding: true,
  },
  argTypes: {
    scheme: {
      control: "select",
      options: ["green", "neutral"],
    },
  },
} satisfies Meta<ComparisonTableProps>;

export const PerformanceTable: StoryObj<ComparisonTableProps> = {
  render: (props) => (
    <Table
      scheme="neutral"
      // highlight can be set with CSS for the cases where it's awkward to add it as a prop
      // `initial` isn't a perfect name for `"yes"`, but this is an edge case for MDX anyway
      className="w-min whitespace-pre [&_tbody_tr:last-child]:[--highlight:initial]"
      {...props}
    >
      <thead>
        <Table.Row>
          <Table.Header>Name</Table.Header>
          <Table.Header>Language</Table.Header>
          <Table.Header>Server</Table.Header>
          <Table.Header>Latency avg</Table.Header>
          <Table.Header>Requests</Table.Header>
        </Table.Row>
      </thead>
      <tbody>
        <Table.Row>
          <Table.Cell>GraphQL Yoga with Response Cache</Table.Cell>
          <Table.Cell>Node.js</Table.Cell>
          <Table.Cell>http</Table.Cell>
          <Table.Cell>46.54ms</Table.Cell>
          <Table.Cell>2.2kps</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>GraphQL Yoga with JIT</Table.Cell>
          <Table.Cell>Node.js</Table.Cell>
          <Table.Cell>http</Table.Cell>
          <Table.Cell>764.83ms</Table.Cell>
          <Table.Cell>120ps</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>GraphQL Yoga</Table.Cell>
          <Table.Cell>Node.js</Table.Cell>
          <Table.Cell>http</Table.Cell>
          <Table.Cell>916.90ms</Table.Cell>
          <Table.Cell>100ps</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Apollo Server</Table.Cell>
          <Table.Cell>Node.js</Table.Cell>
          <Table.Cell>Express</Table.Cell>
          <Table.Cell>1,234.12ms</Table.Cell>
          <Table.Cell>64ps</Table.Cell>
        </Table.Row>
      </tbody>
    </Table>
  ),
};

export const FrameworksTable: StoryObj<ComparisonTableProps> = {
  render: (props) => (
    <Table scheme="green" {...props}>
      <thead>
        <Table.Row>
          <Table.Header>Name</Table.Header>
          <Table.Header>Productivity / Maintainability</Table.Header>
          <Table.Header>Unified Schema design</Table.Header>
          <Table.Header>Sub-services support</Table.Header>
        </Table.Row>
      </thead>
      <tbody>
        <Table.Row highlight>
          <Table.Cell>GraphQL Mesh</Table.Cell>
          <Table.Cell>
            Packages with a server, caching, Envelop plugins, and large
            sub-service types support. Configuration-based with custom
            resolvers.
          </Table.Cell>
          <Table.Cell>
            Flexible Schema design with Transforms and custom resolvers support.
          </Table.Cell>
          <Table.Cell>
            Support for a large range of types of sub-service and databases.
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>GraphQL Tools</Table.Cell>
          <Table.Cell>
            Programmatic approach at the Gateway level. Type merging makes it
            easier to deal with sub-services conflicts.
          </Table.Cell>
          <Table.Cell>
            Access to all GraphQL Schema building libraries.
          </Table.Cell>
          <Table.Cell>
            Only supports GraphQL sub-services out of the box. Other sub-service
            types can be supported with Schema extensions at the Gateway level.
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Apollo Server with DataSources</Table.Cell>
          <Table.Cell>
            Requires a lot of coding and maintenance work at the DataSources
            level.
          </Table.Cell>
          <Table.Cell>
            Access to all GraphQL Schema building libraries.
          </Table.Cell>
          <Table.Cell>
            Integrating with some type of sub-services might require some extra
            work.
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Apollo Federation</Table.Cell>
          <Table.Cell>
            Rover CLI and Apollo Studio. Only the Apollo Gateway needs
            maintenance.
          </Table.Cell>
          <Table.Cell>
            Access to all GraphQL Schema building libraries.
          </Table.Cell>
          <Table.Cell>
            Only supports "Federation compliant" GraphQL sub-services.
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Hasura</Table.Cell>
          <Table.Cell>
            Plug and play solution. Configuration-based with custom resolvers.
          </Table.Cell>
          <Table.Cell>
            The Unified Schema is directly linked to the underlying database
            schema or sub-services design.
          </Table.Cell>
          <Table.Cell>
            Only supports GraphQL and REST sub-services and, a set of databases.
          </Table.Cell>
        </Table.Row>
      </tbody>
    </Table>
  ),
};
