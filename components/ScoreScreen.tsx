"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useQuiz } from "@/context/QuizContext";
import accessibilityIcon from "@/public/icon-accessibility.svg";
import javascriptIcon from "@/public/icon-js.svg";
import cssIcon from "@/public/icon-css.svg"
import htmlIcon from "@/public/icon-html.svg"
import { useEffect } from "react";

export default function ScoreScreen() {
  const { score, totalQuestions, resetQuiz } = useQuiz();

  const pathname = usePathname();
  const router = useRouter(); // Initialize router

  const dynamicPageData: { [key: string]: { title: string; icon: string } } = {
    accessibility: { title: "Accessibility", icon: accessibilityIcon },
    javascript: { title: "Javascript", icon: javascriptIcon },
    css: { title: "CSS", icon: cssIcon },
    html : { title: "HTML", icon: htmlIcon },
  };

  const matchingKey = Object.keys(dynamicPageData).find((key) =>
    pathname.includes(key.toLowerCase())
  );

  const { title, icon } = matchingKey
    ? dynamicPageData[matchingKey]
    : { title: "", icon: "" };

  const handlePlayAgain = () => {
    router.push("/"); // Navigation happens first

    setTimeout(() => {
      resetQuiz();  // Reset state after navigation
    }, 500);  // This short 500ms delay prevents unwanted UI flickers
  }

useEffect(() => {
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter"){
      handlePlayAgain();
    }
  };

  window.addEventListener("keydown", handleKeyPress);
  return () => window.removeEventListener("keydown", handleKeyPress);
}, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-32" role="main">
      <div>
        <h1 className="dark:text-white text-5xl font-light text-dark-navy">
          Quiz Completed <br />
          <span className="font-bold">You Scored...</span>
        </h1>
      </div>
      <div className="w-full md:w-4/5 lg:w-full xl:w-4/5 mt-12 md:mt-12 lg:mt-0">
        <div className="dark:bg-navy dark:shadow-none flex flex-col items-center gap-y-8 shadow-xl shadow-gray-200 bg-white rounded-xl py-10 px-16">
          <div className="flex items-center gap-x-4">
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
            <h1 className="dark:text-white text-xl md:text-2xl font-semibold text-dark-navy">
              {title}
            </h1>
          </div>
          <p className="dark:text-white font-bold text-8xl">{score}</p>
          <p className="dark:text-light-bluish text-grey-navy text-lg">out of {totalQuestions}</p>
        </div>

          <button onClick={handlePlayAgain} className="mt-8 hover:bg-fuchsia-400 w-full bg-purple cursor-pointer p-4 rounded-xl text-white text-lg">
            Play Again
          </button>
      </div>
    </div>
  );
}
