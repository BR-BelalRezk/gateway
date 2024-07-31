import { RowData } from "@tanstack/react-table";

export type FilterPossibleValues = {
  value: string;
  label: string;
  type?: string;
}[];

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    possibleValues?: () => Promise<FilterPossibleValues>;
    enableEnumFilter?: boolean;
    filterLabel: string;
  }
}
