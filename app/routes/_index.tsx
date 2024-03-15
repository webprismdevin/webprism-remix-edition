import { MetaFunction } from "@remix-run/react";
import { BentoGrid, BentoGridItem } from "~/components/BentoGrid";
import { HeroParallax } from "~/components/HeroParallax";
import { TextGenerateEffect } from "~/components/TextGenerateEffect";

import {
  IconBuildingStore,
  IconCompass,
  IconFileInfo,
  IconMailOpened,
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
import HydrogenIcon from "~/components/HydrogenIcon";

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
      <div className="bg-white">
        <div
          className="pt-16 pb-8 md:pt-40 md:pb-20 px-8 md:px-20"
          ref={text_ref}
        >
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
        <div className="pt-8 pb-16 md:py-0 px-8 md:px-20">
          <TestimonialsCarousel />
        </div>
      </div>
      <div className="relative overflow-hidden bg-black pb-12">
        <img
          src="footer.jpg"
          className="object-cover absolute top-0 z-0 w-full md:w-auto md:h-full"
        />
        <div className="w-full h-full absolute top-0 left-0 z-10 bg-gradient-to-b from-white to-white/70" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto relative z-20 p-8 md:px-20 md:py-40">
          <Card>
            <CardHeader>
              <CardTitle>Get in touch</CardTitle>
              <CardDescription>
                You'll get an email after completing this form.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm action="/contact" />
            </CardContent>
          </Card>
          <div className="max-w-xl">
            <CardTitle className="my-6">Questions? Answers.</CardTitle>
            <Accordion type="single" collapsible className="backdrop-blur-sm">
              {faqs.map((faq) => (
                <AccordionItem key={faq.value} value={faq.value}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <p className="absolute bottom-4 left-0 w-full text-center z-20 text-slate-500">
          © WEBPRISM. {new Date().getFullYear()}. Everett, WA.
        </p>
      </div>
    </div>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const BentoImage = ({ src }: { src: string }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 overflow-hidden">
    <img src={src} className="aspect-[2/1] md:apsect-auto object-cover w-full h-full object-top" />
  </div>
);

// bento items
const items = [
  {
    title: "Shopify Themes",
    description:
      "Go further than the template with brand-centric design and a focus on conversion.",
    header: <BentoImage src="/gradients/01.webp" />,
    icon: <IconBuildingStore className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Shopify Hydrogen",
    description:
      "Completely custom online stores that your competitors can't keep up with.",
    header: <BentoImage src="/gradients/03.webp" />,
    icon: <HydrogenIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Landing Pages",
    description: "Focused landing pages to accelerate your ad strategy.",
    header: <BentoImage src="/gradients/05.webp" />,
    icon: <IconFileInfo className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Brand Strategy",
    description:
      "Uncover your brand's advantages, opportunities, and the path towards growth. We'll help you chart your path to continued growth, and execute it with you.",
    header: <BentoImage src="/gradients/17.webp" />,
    icon: <IconCompass className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Email Design",
    description:
      "Fast, clean, conversion-optimized emails to stand out in your customer's inbox.",
    header: <BentoImage src="/gradients/35.webp" />,
    icon: <IconMailOpened className="h-4 w-4 text-neutral-500" />,
  },
];

// main statement
const impact_statement = "We're a boutique creative agency that designs, builds and optimizes ecommerce websites on Shopify.";

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
    value: "item-3",
    question: "What industries have you worked with?",
    answer:
      "We have experience in apparel, footwear, cosmetics, health & wellness, sweepstakes and wine. We like to work in industries that we either have specific knowledge, or a deep interest. That being said, we love new challenges - it all comes down to values alignment to us.",
  },
  {
    value: "item-1",
    question: "What size brands do you work with?",
    answer:
      "We've worked with fledgling brands just getting started up to brands doing $15M+ in annual revenue.",
  },
  {
    value: "item-2",
    question: "Why wouldn't we hire a freelancer instead?",
    answer:
      "Finding a good freelancer usually takes going through a few not-so-good ones. Even once you find the right one, they still need to be managed - which turns you into the project manager. Our roster of partners and vetted contractors is at your disposal when you work with us, and we manage them, so you don't have to.",
  },
  {
    value: "item-5",
    question: "What does it cost to work with you?",
    answer:
      "Landing pages start at $950. Brand strategy work ranges from $2,500 - $7,500, based on your stage of your business. Shopify themes start at $7500. Custom storefronts (Hydrogen) start at $25,000.",
  },
  {
    value: "item-4",
    question: "What's your process like?",
    answer:
      "We have two approaches to creative work. Our 'Full-scope' process is what you'd expect: in-depth onboarding, concepts, design reviews and revisions, and ultimately approval and deliver. For projects that don't have the luxury of time, our 'Straight-shot' process cuts right to the point - we agree on the goal, and you trust us to deliver based on best practices, and your brand guidelines. Small edits, no big revisions.",
  },
  {
    value: "item-6",
    question: "How soon can you start?",
    answer: "We can start most projects within 7 business days.",
  },
];
