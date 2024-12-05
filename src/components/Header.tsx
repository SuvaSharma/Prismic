import React from "react";
import { createClient } from "@/prismicio";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import NavBar from "@/components/NavBar";

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
      <NavBar settings={settings} />
    </header>
  );
}
