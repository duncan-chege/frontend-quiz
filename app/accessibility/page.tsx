"use client";

import SubmitButton from "@/components/SubmitButton";
import ProgressBar from "@/components/ProgressBar";
import quizData from "@/app/data/data.json";
import { useState } from "react";

export default function AccessibilityPage() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0); // It starts at the first question.
  const [submitText, setSubmitText] = useState<string>("Submit Answer");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const questions = quizData.quizzes[3].questions; // Selects the 4th object in the array- The Accessibility quiz. It then extracts the questions array from that quiz

  // questions is the full array of questions.
  // questions[currentIndex] picks one question based on currentIndex.
  const currentQuestion = questions[currentIndex];

  const optionLabels = ["A", "B", "C", "D"];

  const handleOptionSelect = (option: number) => {
    setSelectedOption(option);
  };

  const submitAnswer = () => {
    if (selectedOption === null) {
      setErrorMessage("Please select an answer");
      return; // Stop execution here if no option is selected
    }

    setSubmitText("Next Question");
    setErrorMessage("");

    // Check if selected answer matches the correct answer
    const isAnswerCorrect =
      currentQuestion.options[selectedOption] === currentQuestion.answer;

    setIsCorrect(isAnswerCorrect);
  };

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-x-32 gap-y-8"
      role="main">
      <div>
        <p className="italic text-grey-navy">
          Question {currentIndex + 1} out of {questions.length}
        </p>
        <h3 className="mt-8 font-bold text-2xl md:text-3xl text-dark-navy">
          {currentQuestion.question}
        </h3>

        <ProgressBar
          currentIndex={currentIndex}
          totalQuestions={questions.length}
        />
      </div>
      <div className="flex flex-col gap-y-6">
        {currentQuestion.options.map((option, index) => (
          <li
            key={index}
            className={`group cursor-pointer p-4 flex gap-x-6 items-center shadow-md shadow-gray-200 bg-white rounded-xl
              ${
                selectedOption === index
                  ? isCorrect === null
                    ? "outline outline-[3px] outline-purple" // State is selected but not submitted
                    : isCorrect
                    ? "outline outline-[3px] outline-green" // State is correct answer is submitted
                    : "outline outline-[3px] outline-red" // State is incorrect answer is submitted
                  : ""
              }`}
            onClick={() => handleOptionSelect(index)}>
            <span
              className={`group-hover:bg-fuchsia-100 group-hover:text-purple bg-light-grey text-grey-navy py-2 px-4 rounded-md text-2xl font-bold ${
                selectedOption === index
                  ? isCorrect === null
                    ? "bg-purple text-white"
                    : isCorrect
                    ? "bg-green text-white"
                    : "bg-red text-white"
                  : ""
              }`}>
              {optionLabels[index]}
            </span>
            <h2 className="text-2xl font-semibold text-dark-navy">{option}</h2>
          </li>
        ))}

        <SubmitButton
          submitText={submitText}
          submitAnswer={submitAnswer}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
