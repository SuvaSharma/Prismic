"use client";
import { asImageSrc, Content, isFilled } from '@prismicio/client';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { MdArrowOutward } from 'react-icons/md';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ContentListProps = {
    items: Content.InsightsPostDocument[] | Content.CraftsDocument[];
    contentType: Content.ContentIndexSlice["primary"]["content_type"];
    fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"];
    viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
}

export default function ContentList({ items, contentType, fallbackItemImage, viewMoreText = "ReadMore" }: ContentListProps) {
    const component = useRef(null);
    const revealRef = useRef(null);
    const itemsRef = useRef<(HTMLLIElement | null)[]>([]); // Array to store references of list items
    const [currentItem, setCurrentItem] = useState<null | number>(null);

    const lastMousePos = useRef({ x: 0, y: 0 });

    const urlPrefix = contentType === "Insights" ? "/insights" : "/crafts";

    useEffect(() => {
        const ctx = gsap.context(() => {
            itemsRef.current.forEach((item) => {
                if (item) { // Check that item exists
                    gsap.fromTo(item,
                        { opacity: 0, y: 20 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 2.5,
                            ease: "elastic.out(1,0.5)",
                            scrollTrigger: {
                                trigger: item,
                                start: "top bottom-=100px",  
                                end: "bottom center",
                                toggleActions: "play none none none",
                            }
                        }
                    );
                }
            });
            return () => ctx.revert(); // Cleanup the gsap context
        }, component);

        
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };

            // Calculating speed and direction
            const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

            const ctx = gsap.context(() => {
                if (currentItem !== null) {
                    const maxY = window.scrollY + window.innerHeight - 350;
                    const maxX = window.innerWidth - 250;

                    gsap.to(revealRef.current, {
                        x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
                        y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
                        rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
                        ease: "back.out(2)",
                        duration: 1.3,
                        opacity: 2,
                    });
                }

                lastMousePos.current = mousePos;
                return () => ctx.revert();
            }, component);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [currentItem]);



    const contentImages = items.map((item) => {
        const image = isFilled.image(item.data.hover_image) ? item.data.hover_image : fallbackItemImage;
        return asImageSrc(image, {
            fit: "crop",
            w: 220,
            h: 220,
            exp: -10
        });
    });

    useEffect(()=>{
        contentImages.forEach((url) => {
            if(!url) return;
            const img = new Image();
            img.src = url;

        })
    }, [contentImages]);

    

    const onMouseEnter = (index: number) => {
        setCurrentItem(index);
    };

    const onMouseLeave = () => {
        setCurrentItem(null);
    };

    return (
        <div ref={component}>
            <ul
                className='grid border-b border-b-[#1e272e]'
                onMouseLeave={onMouseLeave}
            >
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        {isFilled.keyText(item.data.title) && (
                            <li
                                className='list-item opacity-0'
                                onMouseEnter={() => onMouseEnter(index)}
                                ref={(el) => {
                                    // Assign the item reference without returning a value
                                    itemsRef.current[index] = el;
                                }} 
                            >
                                <Link
                                    href={urlPrefix + "/" + item.uid}
                                    className='flex flex-col justify-between border-t border-t-[#1e272e] py-10 text-[#1e272e] md:flex-row'
                                    aria-label={item.data.title}
                                >
                                    <div className='flex flex-col'>
                                        <span className='text-3xl font-bold'>{item.data.title}</span>
                                        <div className='gap-5 text-orange-400 text-lg font-bold'>
                                            {item.tags.map((tag, index) => (
                                                <span key={index}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <span className='ml-auto flex items-center gap-2 text-xl font-medium md:ml-0'>
                                        {viewMoreText}
                                        <MdArrowOutward />
                                    </span>
                                </Link>
                            </li>
                        )}
                    </React.Fragment>
                ))}
            </ul>

            {/* Hover element */}
            <div
                className='hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[220px] w-[220px] rounded-lg bg-over bg-center opacity-0 transition-[background] duration-300'
                style={{
                    backgroundImage: currentItem !== null ? `url(${contentImages[currentItem]})` : "",
                }}
                ref={revealRef}
            ></div>
        </div>
    );
}
