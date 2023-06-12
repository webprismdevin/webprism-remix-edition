import { wrap } from "@popmotion/popcorn";
import { useState } from "react";
// import { useInterval } from "hooks/useInterval";
import { AnimatePresence, motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import {
  portableTextComponents,
  sectionPadding,
  urlFor,
} from "~/routes/_index";

export function Testimonials({ testimonials }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const index = wrap(0, testimonials.length, page);
  //   const [delay, setDelay] = useState<number | null>(5000);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  //   useInterval(() => {
  //     paginate(1);
  //   }, delay);

  function handleNext() {
    paginate(1);
    // setDelay(null);
  }

  return (
    <div className={`${sectionPadding}`}>
      <AnimatePresence mode="wait">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center relative"
          custom={direction}
          key={page}
        >
          <motion.img
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 1, type: "tween" },
            }}
            exit={{ opacity: 0 }}
            className="object-cover object-center relative aspect-video md:aspect-square shadow-md rounded-xl overflow-hidden z-10"
            src={urlFor(testimonials[index].image).width(800).height(800).url()}
          />
          <motion.div
            className="max-w-prose mx-auto leading-loose z-0"
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 500, opacity: 0 }}
            key={page}
          >
            <PortableText
              components={portableTextComponents}
              value={testimonials[index].body}
            />
            <p className="font-heading text-lg">{testimonials[index].author}</p>
          </motion.div>
          {testimonials.length > 1 && (
            <button
              onClick={handleNext}
              className="md:absolute right-8 bottom-0 hover:scale-110 transition-transform duration-200"
            >
              next →
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
