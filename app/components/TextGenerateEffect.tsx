import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import cn from "~/lib/cn";

export const TextGenerateEffect = ({
  words,
  className,
  size = "h2",
}: {
  words: string;
  className?: string;
  size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span key={word + idx} className="opacity-0">
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("max-w-7xl mx-auto", className)}>
      <div className="mt-4">
        <div
          className={cn(
            "text-4xl md:text-6xl font-heading",
            size == "h1" && "text-6xl md:text-8xl"
          )}
        >
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
