"use client";

import SubmitButton from "@/components/SubmitButton";
import quizData from "@/app/data/data.json";
import { useState } from "react";

export default function AccessibilityPage() {
  const questions = quizData.quizzes[3].questions;  // Selects the 4th object in the array- The Accessibility quiz. It then extracts the questions array from that quiz
  const [currentIndex, setCurrentIndex] = useState(0);  // It starts at the first question.

  // questions is the full array of questions.
  // questions[currentIndex] picks one question based on currentIndex.
  const currentQuestion = questions[currentIndex];

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-32 gap-y-8" role="main">
      <div>
        <p className="italic text-grey-navy">Question 6 out of 10</p>
        <h3 className="mt-8 font-bold text-2xl md:text-3xl text-dark-navy">
          {currentQuestion.question}
        </h3>
      </div>
      <div className="flex flex-col gap-y-6">

        {currentQuestion.options.map((option, index) => (
          <li key={index} className="group active:outline active:outline-[3px] active:outline-purple cursor-pointer p-4 flex gap-x-6 items-center shadow-md shadow-gray-200 bg-white rounded-xl">
            <span className="group-active:bg-purple group-active:text-white group-hover:bg-fuchsia-100 group-hover:text-purple py-2 px-4 bg-light-grey rounded-md text-2xl font-bold text-grey-navy">{optionLabels[index]}</span>
            <h2 className="text-2xl font-semibold text-dark-navy">{option}</h2>
          </li>
        ))}
        
        <SubmitButton />
      </div>
    </div>
  );
}
