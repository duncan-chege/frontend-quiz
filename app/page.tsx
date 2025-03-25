"use client";

import Image from "next/image";
import htmlIcon from "@/public/icon-html.svg";
import cssIcon from "@/public/icon-css.svg";
import jsIcon from "@/public/icon-js.svg";
import accessibilityIcon from "@/public/icon-accessibility.svg";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const options = [
    { href: "/html", icon: htmlIcon, label: "HTML", alt: "html icon" },
    { href: "/css", icon: cssIcon, label: "CSS", alt: "css icon" },
    { href: "/javascript", icon: jsIcon, label: "Javascript", alt: "js icon" },
    {
      href: "/accessibility",
      icon: accessibilityIcon,
      label: "Accessibility",
      alt: "accessibility icon",
    },
  ];

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      const nextValue =
        selectedOption === null
          ? 0
          : Math.min(selectedOption + 1, options.length - 1); // Arrow moves down but stops at the last option
      setSelectedOption(nextValue);
    } else if (event.key === "ArrowUp") {
      const nextValue =
        selectedOption === null
          ? 0 // Start from 0 instead of doing nothing
          : Math.max(selectedOption - 1, 0); // Arrow moves up but stops at the first option
      setSelectedOption(nextValue);
    } else if (event.key === "Enter" && selectedOption !== null) {
      const selectedOptionElement = document.querySelector(
        `[data-option-index="${selectedOption}"]` // Find the selected Link element using the data attribute
    ) as HTMLAnchorElement | null;
    
    if (selectedOptionElement) {
        selectedOptionElement.click();  // Trigger a click event on the actual Link component
    }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedOption, handleKeyPress]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-32" role="main">
      <div>
        <h1 className="text-5xl font-light text-dark-navy">
          Welcome to the <span className="font-bold">Frontend Quiz!</span>
        </h1>
        <p className="mt-8 mb-4 text-grey-navy italic">
          Pick a subject to get started
        </p>
      </div>
      <div className="space-y-4">
        {options.map((option, index) => (
          <Link
            key={option.href}
            href={option.href}
            data-option-index={index} // Add a data-option-index attribute to each Link component to identify them
            className={`cursor-pointer p-4 flex gap-x-6 items-center shadow-md shadow-gray-200 bg-white rounded-xl ${
              selectedOption === index
                ? "outline outline-[3px] outline-purple"
                : ""
            }`}>
            <Image
              src={option.icon}
              alt={option.alt}
              className={`p-2 rounded-md ${
                option.label === "HTML"
                  ? "bg-orange-100"
                  : option.label === "CSS"
                  ? "bg-emerald-100"
                  : option.label === "Javascript"
                  ? "bg-blue-100"
                  : option.label === "Accessibility"
                  ? "bg-fuchsia-100"
                  : ""
              }`}
            />
            <h2 className="text-2xl font-semibold text-dark-navy">
              {option.label}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
