export default function TestimonialsCarousel() {
  return (
    <div className="flex md:h-[32rem] max-w-7xl mx-auto">
      <div className="w-1/2 flex flex-col justify-center">
        <div>
          <h2 className="text-2xl mb-4">TRUSTED PARTNERS</h2>
          <h1 className="text-6xl font-heading mb-4">FROM OUR CLIENTS</h1>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <TestimonialComponent />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowNarrowRight } from "@tabler/icons-react";

const testimonials = [
  // ... array of testimonial objects
  {
    id: 1,
    quote:
      "Reprehenderit nostrud dolor magna irure consectetur commodo ex laboris cillum quis. Anim sunt tempor veniam duis ad cillum magna exercitation. Eu esse enim labore nisi magna mollit Lorem eu occaecat ipsum excepteur.",
    author: "Keanu Reeves",
  },
  {
    id: 2,
    quote:
      "The ultimate price of freedom is the willingness to face the fear of the unknown.",
    author: "Bodhi",
  },
  {
    id: 3,
    quote:
      "Fear causes hesitation, and hesitation will cause your worst fears to come true.",
    author: "Bodhi",
  },
  {
    id: 4,
    quote: "It's not tragic to die doing what you love.",
    author: "Bodhi",
  },
  {
    id: 5,
    quote:
      "If you want the ultimate, you've got to be willing to pay the ultimate price.",
    author: "Bodhi",
  },
  {
    id: 6,
    quote: "Life sure has a sick sense of humor, doesn't it?",
    author: "Johnny Utah",
  },
  {
    id: 7,
    quote: "You gotta go down. You gotta go down big.",
    author: "Bodhi",
  },
];

const TestimonialComponent = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((current) => (current + 1) % testimonials.length);
  };

  // Cycle testimonials every X seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 5000); // Change the testimonial every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-start justify-center relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={testimonials[index].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className=""
        >
          <p className="text-xl font-semibold mb-4">
            {testimonials[index].quote}
          </p>
          <p className="font-medium">{testimonials[index].author}</p>
        </motion.div>
      </AnimatePresence>
      <button
        onClick={handleNext}
        className="absolute right-0 top-3/4 bg-white p-2 rounded-full shadow-lg cursor-pointer"
      >
        <IconArrowNarrowRight color="black" />
      </button>
    </div>
  );
};
