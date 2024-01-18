import { urlFor } from "~/sanity/client";
import Body from "../PortableText";
import { forwardRef, useRef } from "react";
import { Pagination } from "./Pagination";
import { ModuleProps } from "../Modules";

export type Column = {
  _type: "column";
  _keys: string;
  body: any;
  image: any;
};

type ColumnsProps = {
  columns: Column[];
} & ModuleProps;

export default function Columns(props: ColumnsProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Pagination {...props} ref={ref}>
      <ColumnLayout {...props} ref={ref} />
    </Pagination>
  );
}

const ColumnLayout = forwardRef<HTMLDivElement, ColumnsProps>((props, ref) => (
  <div
    ref={ref}
    className="overflow-y-scroll flex snap-x hiddenScroll relative"
    style={{
      color: props.colorTheme.text.hex,
    }}
  >
    {props.columns.map((column: Column) => {
      return (
        <div
          key={column._keys}
          className="h-[700px] md:h-[900px] min-w-[320px] md:min-w-[640px] grow-0 relative snap-start"
        >
          {column?.image && column.image?.asset && (
            <img
              src={urlFor(column?.image).url()}
              alt={column.image.alt}
              className="h-[700px] md:h-[900px] w-[320px] md:w-[640px] object-cover z-0"
            />
          )}
          {column.body && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-end justify-center z-10 p-10">
              <div>
                <Body value={column.body} />
              </div>
            </div>
          )}
        </div>
      );
    })}
  </div>
));
