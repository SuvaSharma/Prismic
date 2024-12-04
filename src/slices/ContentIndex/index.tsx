import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import ContentList from "./ContentList";
import { createClient } from "@/prismicio";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({
   slice 
  }: ContentIndexProps): Promise<JSX.Element>  => {
  const client = createClient();

  const insightPosts = await client.getAllByType("insights_post");
  const crafts = await client.getAllByType("crafts");

  const contentType = slice.primary.content_type || "Insights"

  const items = contentType === "Insights" ? insightPosts: crafts;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
     
     <Heading size= "lg" className= "mb-8">
      {slice.primary.heading}
     </Heading>
     {isFilled.richText(slice.primary.description) && (
      <div className="prose prose-xl prose-invert-bold mb-10 text-[#1e272e]">
        <PrismicRichText field={slice.primary.description} />
      </div>
     )}
     <ContentList 
     items= {items} contentType = {contentType} viewMoreText = {slice.primary.view_more_text} fallbackItemImage = {slice.primary.fallback_item_image} />
    </Bounded>
  );
};

export default ContentIndex;
