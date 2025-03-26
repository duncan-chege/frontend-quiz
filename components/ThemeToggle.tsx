"use client";

import Image from "next/image";
import sunDarkIcon from "@/public/icon-sun-dark.svg";
import sunLightIcon from "@/public/icon-sun-light.svg";
import moonDarkIcon from "@/public/icon-moon-dark.svg";
import moonLightIcon from "@/public/icon-moon-light.svg";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Sets the initial state based on localStorage. This function only runs once when component mounts
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false; //If localStorage is unavailable, defaults to light mode
  });

  // Prevent flickering by setting class immediately
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []); // Runs only once on mount

  useEffect(() => {
    // Runs when the dark mode changes
    if (typeof window !== "undefined") {
      if (darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [darkMode]);

  return (
    <>
      {darkMode ? (
        <Image src={sunLightIcon} alt="the light sun icon" />
      ) : (
        <Image src={sunDarkIcon} alt="the dark sun icon" />
      )}
      <label
        htmlFor="check"
        className="flex bg-purple cursor-pointer relative w-12 h-6 rounded-full"
        aria-label="Toggle dark mode">
        <input
          type="checkbox"
          id="check"
          className="sr-only peer"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <span
          className={`w-2/5 h-4/5 bg-white absolute rounded-full left-1 top-[2px] transition-all duration-500 
            peer-checked:left-6 peer-checked:bg-white ${
              darkMode ? "left-6" : ""
            }`}></span>
      </label>
      {darkMode ? (
        <Image src={moonLightIcon} alt="the light moon icon" />
      ) : (
        <Image src={moonDarkIcon} alt="the dark moon icon" />
      )}
    </>
  );
}
