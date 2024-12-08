import React from "react";
import { createClient } from "@/prismicio";
import NavBar from "@/components/NavBar";

// Define proper types for settings data
type NavItem = { label: string; link: string };

type Settings = {
  data: {
    name: string;
    nav_item: NavItem[];
  };
};

export default async function Header() {
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
