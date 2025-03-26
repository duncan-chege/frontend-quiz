"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import accessibilityIcon from "@/public/icon-accessibility.svg";
import javascriptIcon from "@/public/icon-js.svg";
import cssIcon from "@/public/icon-css.svg";
import htmlIcon from "@/public/icon-html.svg"
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname(); // Get the current route

  // Define dynamic titles and icons based on keywords in the URL
  const dynamicPageData: { [key: string]: { title: string; icon: string } } = {
    accessibility: { title: "Accessibility", icon: accessibilityIcon },
    javascript: { title: "Javascript", icon: javascriptIcon },
    css : { title: "CSS", icon: cssIcon },
    html : { title: "HTML", icon: htmlIcon },
  };

  // Find the first matching keyword in pathname
  const matchingKey = Object.keys(dynamicPageData).find((key) =>
    pathname.includes(key.toLowerCase())
  );

  // If a match is found, use its title and icon; otherwise set empty values
  const { title, icon } = matchingKey
    ? dynamicPageData[matchingKey]
    : { title: "", icon: "" };

  return (
    <header className="flex justify-between pb-12 xl:pb-20">
      <div className="flex items-center gap-x-4">
        {icon && (
          <Image
            className={`p-2 rounded-md ${
              title === "Accessibility"
                ? "bg-fuchsia-100"
                : title === "Javascript"
                ? "bg-blue-100"
                : title === "CSS"
                ? "bg-emerald-100"
                : title === "HTML"
                ? "bg-orange-100"
                : ""
            }`}
            src={icon}
            alt={`${title} icon`}
          />
        )}
        <h1 className="dark:text-white text-xl md:text-2xl font-semibold text-dark-navy">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-x-2">
       <ThemeToggle />
      </div>
    </header>
  );
}
