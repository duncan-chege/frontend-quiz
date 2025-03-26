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
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    // Runs when the component mounts
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
    } else if (theme === "light") {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    // Runs when the dark mode changes
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
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
        className="flex bg-purple cursor-pointer relative w-12 h-6 rounded-full">
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
