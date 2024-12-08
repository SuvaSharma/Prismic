"use client"; // Mark the component as a client component

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `Experience` slice.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  useEffect(() => {
    // Animate the main heading (h2)
    gsap.fromTo(
      ".experience-heading",
      { opacity: 0, x: 100 }, // Start off the screen (right side)
      {
        opacity: 1,
        x: 0, // End at its final position
        ease: "power3.out", // Smooth easing effect
        duration: 1.5, // Duration of the animation
        scrollTrigger: {
          trigger: ".experience-heading",
          start: "top 80%", // Trigger when the heading reaches 80% of the viewport height
          once: true, // Ensure the animation runs once when triggered
        },
      }
    );

    // Animate each experience item (h3 and its content) from the right side
    slice.primary.repeatable_zone.forEach((_, index) => {
      gsap.fromTo(
        `.experience-item-${index}`,
        {
          opacity: 0,
          x: 100, // Start off-screen from the right side
        },
        {
          opacity: 1,
          x: 0, // End at its final position
          stagger: 0.3, // Stagger the items for a sequential appearance
          ease: "power3.out", // Easing for smooth animation
          duration: 1,
          scrollTrigger: {
            trigger: `.experience-item-${index}`,
            start: "top 80%", 
            scrub: true,
            toggleActions: "play none none none"
        
        
          },
        }
      );
    });
  }, [slice]);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading as="h2" size="lg" className="experience-heading">
        {slice.primary.heading}
      </Heading>
      {slice.primary.repeatable_zone.map((item, index) => (
        <div
          key={index}
          className={`ml-6 mt-8 max-w-prose md:ml-12 md:mt-16 experience-item-${index}`}
        >
          <Heading as="h3" size="sm" color="text-[#295F98]">
            {item.title}
          </Heading>

          <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-[#ffffff]">
            <span>{item.time_period}</span>{" "}
            <span className="text-3xl font-extralight">/</span>{" "}
            <span>{item.institution}</span>
          </div>
          <div className="prose prose-lg prose-invert mt-4 text-[#000000]">
            <PrismicRichText field={item.description} />
          </div>
        </div>
      ))}
    </Bounded>
  );
};

export default Experience;
