import { MetaFunction } from "@remix-run/react";
import { BentoGrid, BentoGridItem } from "~/components/BentoGrid";
import { HeroParallax } from "~/components/HeroParallax";
import { TextGenerateEffect } from "~/components/TextGenerateEffect";

import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ContactForm } from "./contact";
import { useInView } from "framer-motion";
import { useRef } from "react";
import TestimonialsCarousel from "~/components/Testimonials";

export const meta: MetaFunction = () => {
  return [
    { title: "WEBPRISM" },
    { name: "description", content: "A creative agency for Shopify brands." },
  ];
};

export default function Index() {
  const text_ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(text_ref, {
    once: true,
  });

  return (
    <div>
      <HeroParallax products={products} />
      <div
        className="pt-16 pb-8 md:pt-40 md:pb-20 px-8 md:px-20"
        ref={text_ref}
      >
        {/* update to only start when in view */}
        <TextGenerateEffect
          key={isInView ? 0 : 1}
          words={isInView ? impact_statement : ""}
          size="h2"
        />
      </div>
      <div className="p-8 md:p-20">
        <BentoGrid>
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
      <div className="p-8 md:p-20">
        <TestimonialsCarousel />
      </div>
      <div className="p-8 md:p-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Get in touch</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm action="/contact" />
            </CardContent>
          </Card>
          <div className="max-w-xl">
            <Accordion type="single" collapsible>
              {faqs.map((faq) => (
                <AccordionItem key={faq.value} value={faq.value}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

// bento items
const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  // {
  //   title: "The Joy of Creation",
  //   description: "Experience the thrill of bringing ideas to life.",
  //   header: <Skeleton />,
  //   icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  // },
  // {
  //   title: "The Spirit of Adventure",
  //   description: "Embark on exciting journeys and thrilling discoveries.",
  //   header: <Skeleton />,
  //   icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  // },
];

// main statement
const impact_statement =
  "Sunt est veniam commodo labore commodo sint anim dolore labore sunt labore.";

// hero parallax items
const products = [
  {
    title: "TOR Salon Products",
    thumbnail: "/hero/tor.jpg",
    link: "/",
  },
  {
    title: "Simon's",
    thumbnail: "/hero/simons.jpg",
    link: "/",
  },
  {
    title: "Sant'Angelus",
    thumbnail: "/hero/sant_angelus.gif",
    link: "/",
  },
  {
    title: "Own Boss Supply Co",
    thumbnail: "/hero/own_boss.gif",
    link: "/",
  },
  {
    title: "LGND Footwear",
    thumbnail: "/hero/lgnd_footwear.jpg",
    link: "/",
  },
  {
    title: "Hasabe",
    thumbnail: "/hero/hasabe.jpg",
    link: "/",
  },
  {
    title: "Freedom Fatigues",
    thumbnail: "/hero/freedom_fatigues.jpg",
    link: "/",
  },
  {
    title: "FBD Collars",
    thumbnail: "/hero/fbd_collars.jpg",
    link: "/",
  },
  {
    title: "Fallen Leaf Films",
    thumbnail: "/hero/fallen_leaf.jpg",
    link: "/",
  },
  {
    title: "Apres Beauty",
    thumbnail: "/hero/apres_beauty.jpg",
    link: "/",
  },
  {
    title: "Amelia Wilde Books",
    thumbnail: "/hero/amelia_wilde.jpg",
    link: "/",
  },
];

// sort of self explanator
const faqs = [
  {
    value: "item-1",
    question: "What size brands do you work with?",
    answer: "We've worked with brands from $100k to $15M in revenue.",
  },
  {
    value: "item-2",
    question: "Why wouldn't we hire a freelancer instead?",
    answer:
      "Many clients have come to use after the freelancer phase - once they need a long term partner. Someone who's invested in their success. Our clients aren't next month's rent. They're partners, who's success is our own.",
  },
];
