"use client";

import SubmitButton from "@/components/SubmitButton";
import ProgressBar from "@/components/ProgressBar";
import quizData from "@/app/data/data.json";
import Image from "next/image";
import errorIcon from "@/public/icon-error.svg";
import correctIcon from "@/public/icon-correct.svg";
import { useState, useEffect } from "react";
import ScoreScreen from "@/components/ScoreScreen";

export default function AccessibilityPage() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null); // Tracks the selected option
  const [currentIndex, setCurrentIndex] = useState<number>(0); // It starts at the first question.
  const [submitText, setSubmitText] = useState<string>("Submit Answer");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // Stores if the answer is correct or incorrect
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false); // Tracks if the answer has been submitted
  const [score, setScore] = useState<number>(0);  // Tracks the score

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

    setErrorMessage("");

    if (currentIndex === questions.length -1 ){
      setSubmitText("View Score");  // This runs only when currentIndex changes
      return <ScoreScreen score={score} questions={questions} />
    } else {
      setSubmitText("Next Question");
    }

    // Check if selected answer matches the correct answer
    const isAnswerCorrect = currentQuestion.options[selectedOption] === currentQuestion.answer;

    // Check if the selected answer is correct
    if (isAnswerCorrect){
      setScore(prevScore => prevScore + 1) // Increase the score by 1 for a correct answer
    }

    setIsCorrect(isAnswerCorrect);
    setIsSubmitted(true); // Mark the answer as submitted
  };

  const nextQuestion = () => {
   if (currentIndex < questions.length - 1) { // Ensures that "Next Question" is only enabled when there's another question left
      setCurrentIndex((prevIndex) => prevIndex + 1);  // Move to next question
      setSelectedOption(null);  // Reset selected option
      setIsSubmitted(false);  // Enable options again
      setSubmitText("Submit Answer"); // Reset button text
      setIsCorrect(null); // Reset correctness state for the next question
    }
  }

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
                  ? `outline outline-[3px] ${
                      isCorrect === null // The user hasn't yet clicked the button
                        ? "outline-purple" // State is selected but not submitted
                        : isCorrect
                        ? "outline-green" // State is correct answer is submitted
                        : "outline-red" // State is incorrect answer is submitted
                    }`
                  : isSubmitted
                  ? "opacity-50 pointer-events-none" // The other options are NOT selected but the answer has been submitted
                  : ""
              }`}
            onClick={() => handleOptionSelect(index)}>
            <span
              className={`group-hover:bg-fuchsia-100 group-hover:text-purple py-2 px-4 rounded-md text-2xl font-bold ${
                selectedOption === index
                  ? isCorrect === null
                    ? "bg-purple text-white group-hover:bg-purple group-hover:text-white"
                    : isCorrect
                    ? "bg-green text-white group-hover:bg-green group-hover:text-white"
                    : "bg-red text-white group-hover:bg-red group-hover:text-white"
                  : "bg-light-grey text-grey-navy"
              }`}>
              {optionLabels[index]}
            </span>
            <h2 className="text-2xl font-semibold text-dark-navy">{option}</h2>
            { ( selectedOption === index && isCorrect === true ) && <Image src={correctIcon} alt="correct icon"></Image> }
            { ( selectedOption === index && isCorrect === false ) && <Image src={errorIcon} alt="error icon"></Image> }
          </li>
        ))}

        <SubmitButton
          submitText={submitText}
          submitAnswer={submitAnswer}
          errorMessage={errorMessage}
          isSubmitted={isSubmitted}
          nextQuestion={nextQuestion}
        />
      </div>
    </div>
  );
}
