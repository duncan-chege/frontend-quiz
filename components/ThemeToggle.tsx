"use client";

import Image from "next/image";
import moonIcon from "@/public/icon-moon-dark.svg";
import sunIcon from "@/public/icon-sun-dark.svg";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    // Runs when the component mounts
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
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
      <Image src={sunIcon} alt="the sun icon" />
      <label
        htmlFor="check"
        className="flex bg-purple cursor-pointer relative w-12 h-6 rounded-full"
        onClick={() => setDarkMode(!darkMode)}>
        <input type="checkbox" id="check" className="sr-only peer" />
        <span className="w-2/5 h-4/5 bg-white absolute rounded-full left-1 top-[2px] peer-checked:bg-white peer-checked:left-6 transition-all duration-500"></span>
      </label>
      <Image src={moonIcon} alt="the moon icon" />
    </>
  );
}
