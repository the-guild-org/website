import { ComponentProps, FC } from "react";

import { cn } from "../cn";

export interface ComparisonTableProps extends React.HTMLAttributes<HTMLTableElement> {
  scheme?: "green" | "neutral";
}
const Table = ({
  className,
  scheme = "green",
  ...props
}: ComparisonTableProps) => {
  return (
    <table
      className={cn(
        "block overflow-x-auto nextra-scrollbar rounded-2xl border border-(--border)",
        scheme === "green" &&
          "[--border:var(--color-green-200)] [--highlight-bg:var(--color-green-100)]",
        scheme === "neutral" &&
          "[--border:var(--color-beige-400)] [--highlight-bg:var(--color-beige-100)] dark:[--border:var(--color-neutral-800)]",
        className,
      )}
      {...props}
    />
  );
};

const TableRow: FC<ComponentProps<"tr"> & { highlight?: boolean }> = ({
  className,
  highlight,
  ...props
}) => {
  return (
    <tr
      className={cn(
        "bg-(--highlight,var(--highlight-bg)) [--highlight:0]",
        highlight && "[--highlight:initial]",
        className,
      )}
      {...props}
    />
  );
};

const cellStyle = cn(
  "border border-(--border) p-4 first:sticky first:left-0 first:border-l-0 first:bg-(--highlight,var(--highlight-bg)) last:border-r-0 max-sm:first:drop-shadow-2xl in-[tbody]:border-b-0 in-[thead]:border-t-0",
);

const TableHeader: FC<ComponentProps<"th">> = ({ className, ...props }) => {
  return <th className={cn(cellStyle, "font-medium", className)} {...props} />;
};

const TableCell: FC<ComponentProps<"td">> = ({ className, ...props }) => {
  return <td className={cn(cellStyle, className)} {...props} />;
};

/**
 * It's exported under the name `ComparisonTable`
 * because we also reexport `Table` from nextra.
 */
export const ComparisonTable = Object.assign(Table, {
  Cell: TableCell,
  Header: TableHeader,
  Row: TableRow,
});
