"use client";
import { useState, useEffect } from "react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap"; // GSAP for animation
import { ScrollTrigger } from "gsap/ScrollTrigger"; // GSAP ScrollTrigger

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `Approach` component.
 */
export type ApproachProps = SliceComponentProps<Content.ApproachSlice>;

/**
 * Component for "Approach" Slices.
 */
const Approach = ({ slice }: ApproachProps): JSX.Element => {
  // State to track which description is shown
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    // Toggle visibility of the description
    if (activeIndex === index) {
      setActiveIndex(null); // Close current active
    } else {
      setActiveIndex(index); // Open new active
    }
  };

  useEffect(() => {
    // Animate the appearance of the description when activeIndex changes
    if (activeIndex !== null) {
      gsap.fromTo(
        `.description-${activeIndex}`,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }
  }, [activeIndex]);

  useEffect(() => {
    // ScrollTrigger animation for each approach container
    slice.primary.repeatable_zone.forEach((item, index) => {
      gsap.fromTo(
        `.approach-container-${index}`,
        {
          opacity: 0,
          scale: 0.8,
          transformOrigin: "center",
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.7)", // Bounce effect for container appearance
          scrollTrigger: {
            trigger: `.approach-container-${index}`, // Trigger for each container
            start: "top 80%", // When the top of the element hits 80% of the viewport height
            end: "bottom 30%", // Ends animation when the bottom of the element hits 30% of the viewport height
            scrub: true, // Smooth scrolling animation
          },
        }
      );
    });
  }, [slice.primary.repeatable_zone]);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Main Heading centered */}
      <Heading as="h2" size="lg" className="text-center approach-heading">
        {slice.primary.heading}
      </Heading>

      {/* Containers for the titles and descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {slice.primary.repeatable_zone.map((item, index) => (
          <div
            key={index}
            className={`approach-container approach-container-${index} flex flex-col items-center justify-center p-10 rounded-xl shadow-md w-full max-w-xl mx-auto`}
            style={{
              height: "400px",
              width: "340px",
              position: "relative",
              background:
                activeIndex === index
                  ? "linear-gradient(135deg, #295F98, #66aaff)" // Gradient for active container
                  : "linear-gradient(135deg, #F4F6FF, #D4F6FF)", // Gradient for inactive container
              transition: "background 0.8s ease-in-out", // Smooth background transition
            }}
          >
            {/* Button with title centered */}
            {activeIndex !== index && (
              <button
                className={`text-xl font-semibold text-[#295F98] bg-transparent border-2 border-[#295F98] px-6 py-2 rounded-xl hover:bg-[#295F98] hover:text-white transition-all duration-300`}
                onClick={() => handleClick(index)} // Toggle visibility
                style={{ margin: "auto" }} // Center button
              >
                {item.title}
              </button>
            )}

            {/* Description that appears when button is clicked */}
            {activeIndex === index && (
              <div
                className={`mt-4 prose prose-lg description-${index} text-white font-semibold`}
              >
                <PrismicRichText field={item.description} />
              </div>
            )}
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default Approach;
