import { forwardRef, useEffect, useState } from "react";
import { Column } from ".";
import { ArrowLeft, ArrowRight } from "~/components/Icon";

type PaginationProps = {
  columns: Column[];
  colorTheme: any;
  children: React.ReactNode;
};

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (props, ref) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = props.columns.length;

    const nextSlide = () => {
      if (currentSlide < totalSlides - 2) {
        setCurrentSlide(currentSlide + 1);
      }
    };

    const prevSlide = () => {
      if (currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
    };

    useEffect(() => {
      const current = ref.current;

      const slideWidth = current?.scrollWidth! / props.columns?.length;

      current?.scrollTo({
        left: slideWidth * currentSlide,
        behavior: "smooth",
      });
    }, [currentSlide]);

    return (
      <div className="relative">
        <div className="absolute bottom-4 right-4 z-50 flex gap-3">
          <button
            onClick={prevSlide}
            style={{
              borderColor: props.colorTheme.text.hex,
            }}
            disabled={currentSlide === 0}
            className={`p-2 border-2 rounded-full`}
          >
            <ArrowLeft color={props.colorTheme.text.hex} />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 2}
            style={{
              borderColor: props.colorTheme.text.hex,
            }}
            className={`p-2 border-2 rounded-full`}
          >
            <ArrowRight color={props.colorTheme.text.hex} />
          </button>
        </div>
        {props.children}
      </div>
    );
  }
);
