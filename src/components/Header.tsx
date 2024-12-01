import React from "react";
import { createClient } from "@/prismicio";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

type Settings = {
  data: {
    name: any;
    nav_item: Array<{ label: string; link: any }>;
  };
};

export default async function Header() {
  // Fetch settings data
  const client = createClient();
  const settings = await client.getSingle("settings");

  // Handle case where settings might not be available
  if (!settings || !settings.data) {
    return <header>Loading...</header>;
  }

  return (
    <header className="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4">
      <nav>
        <ul>
          <li>
            <Link href="/" aria-label="Home Page">
              <PrismicRichText field={settings.data.name} />
            </Link>
          </li>
          {settings.data.nav_item && settings.data.nav_item.map(({ link, label }, index) => (
            <li key={index}>
              <PrismicNextLink field={link}>{label}</PrismicNextLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
