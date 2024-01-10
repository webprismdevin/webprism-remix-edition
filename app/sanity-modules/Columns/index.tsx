import { ModuleProps } from "../Hero";

type ColumnsModule = {
  columns: any[];
} & ModuleProps;

export default function Columns(props: ColumnsModule) {
  return (
    <div className="flex w-full justify-around p-5 md:p-8">
      {props.columns.map((column) => (
        <div
          className="grow-0 shrink-0"
          style={{
            minWidth: `${(1 / props.columns.length) * 100}%`
          }}
        >
          column
        </div>
      ))}
    </div>
  );
}
