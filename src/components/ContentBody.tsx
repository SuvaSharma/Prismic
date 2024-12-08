import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, DateField, isFilled } from "@prismicio/client";



export default function ContentBody({page}: {
    page: Content.InsightsPostDocument | Content.CraftsDocument;
}) {


  function formatDate(date: DateField){
    if (isFilled.date(date)){

        const dateOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        };

        return new Intl.DateTimeFormat("en-US", dateOptions).format(new Date(date))
    }
  }

  const formattedDate = formatDate(page.data.date)

  return (
  <Bounded as="article">
    <div className="rounde-2xl border-2 border-[#b4e2ff] bg-[#b4e2ff] px-4 py-10 md:px-8 md:py-20">
        <Heading as ="h1"> {page.data.title}</Heading>
        <div className="flex gap-4 text-orange-400 text-xl font-bold">
        {page.tags.map((tag) => (
  <span key={tag}>{tag}</span>
))}

        
        </div>
    <p className="mt-8 border-b border-slate-900 text-xl font-medium text-slate-900">{formattedDate}</p>
    <div className="prose prose-lg prose-invert mt-12 w-full max-w-none text-[#000000] md:mt-20">
  <SliceZone slices={page.data.slices} components={components} />
  </div>
  </div>
  </Bounded>
  );
}

