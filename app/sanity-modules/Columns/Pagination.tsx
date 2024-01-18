import { forwardRef, useEffect, useState } from "react";
import { Column } from ".";

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
      if (currentSlide < totalSlides - 1) {
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
            disabled={currentSlide === 0}
            className={`px-4 py-2 rounded-full ${
              currentSlide === 0 ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
          >
            Previous
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`px-4 py-2 rounded-full ${
              currentSlide === totalSlides - 1
                ? "bg-gray-300"
                : "bg-blue-500 text-white"
            }`}
          >
            Next
          </button>
        </div>
        {props.children}
      </div>
    );
  }
);
