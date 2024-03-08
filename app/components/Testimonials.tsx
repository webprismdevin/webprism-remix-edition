export default function TestimonialsCarousel() {
  return (
    <div className="flex flex-col md:flex-row md:h-[32rem] max-w-7xl mx-auto">
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div>
          <h2 className="text-2xl mb-4">TRUSTED PARTNERS</h2>
          <h1 className="text-6xl font-heading mb-4">FROM OUR CLIENTS</h1>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white">
        <TestimonialComponent />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowNarrowRight } from "@tabler/icons-react";

const testimonials = [
  {
    id: 1,
    quote:
      "We hired WEBPRISM to help with our company's rebranding efforts. WEBPRISM is smart and kind and just the kind of partner we were looking for to work with…and we couldn't imagine doing this without them.",
    author: "Tina Tor, CFO @ Tor Salon & Spa Products",
  },
  {
    id: 2,
    quote:
      "We had many custom features we wanted to see in the new site and lofty goals in terms of performance (speed, core web vitals, etc), and Devin and his team hit them all. In the 30 days post launch compared to the same timeframe the previous year, we saw total sales increase 239%, conversion rate increase 75%, total orders increase 235%, and store sessions increase by 114%.",
    author: "Ryann Vargo, COO @ Freedom Fatigues",
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
