// Handles all logic and rendering of the quizzes
"use client";

import SubmitButton from "@/components/SubmitButton";
import ProgressBar from "@/components/ProgressBar";
import quizData from "@/data/data.json";
import Image from "next/image";
import errorIcon from "@/public/icon-error.svg";
import correctIcon from "@/public/icon-correct.svg";
import { useQuiz } from "@/context/QuizContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface QuizComponentProps {
  quizIndex: number;
}

export default function QuizComponent({ quizIndex }: QuizComponentProps) {
  const {
    currentIndex,
    setCurrentIndex,
    selectedOption,
    setSelectedOption,
    isSubmitted,
    setIsSubmitted,
    score,
    setScore,
    quizFinished,
    setQuizFinished,
    submitText,
    setSubmitText,
    errorMessage,
    setErrorMessage,
    isCorrect,
    setIsCorrect,
    setTotalQuestions,
  } = useQuiz();

  const questions = quizData.quizzes[quizIndex].questions; // Selects the nth object in the array and extracts the questions array from that quiz

  // Set total number of questions when quiz starts
  useEffect(() => {
    setTotalQuestions(questions.length);
  }, [questions.length, setTotalQuestions]); // Only runs when questions.length changes

  // questions is the full array of questions.
  // questions[currentIndex] picks one question based on currentIndex.
  const currentQuestion = questions[currentIndex];

  const optionLabels = ["A", "B", "C", "D"];

  const router = useRouter(); // Initialize router

  const handleKeyPress = (event: KeyboardEvent) => {
    if (isSubmitted) {
      if (event.key === "Enter") {
        nextQuestion(); // Move to the next question
      }
      return; // Prevent further key actions after submission
    }

    if (event.key === "Enter" && selectedOption !== null) {
      submitAnswer(); // Submit the selected answer
      return;
    } else if (event.key === "Enter" && selectedOption === null) {
      setErrorMessage("Please select an answer");
    }

    if (event.key === "ArrowDown") {
      const nextValue =
        selectedOption === null
          ? 0
          : Math.min(selectedOption + 1, currentQuestion.options.length - 1); // Arrow moves down but stops at the last option
      setSelectedOption(nextValue);
    } else if (event.key === "ArrowUp") {
      const nextValue =
        selectedOption === null
          ? 0 // Start from 0 instead of doing nothing
          : Math.max(selectedOption - 1, 0); // Arrow moves up but stops at the first option
      setSelectedOption(nextValue);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedOption, isSubmitted, currentIndex]);

  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {  // Ensures it's a valid focusable element before calling .blur()
      document.activeElement.blur(); // Removes focus from any element
    }
  }, [currentIndex, handleKeyPress]); // Runs when a new question loads

  const handleOptionSelect = (option: number) => {
    setSelectedOption(option);
  };

  const submitAnswer = () => {
    if (selectedOption === null) {
      setErrorMessage("Please select an answer");
      return; // Stop execution here if no option is selected
    }

    setErrorMessage("");

    if (currentIndex === questions.length - 1) {
      setSubmitText("View Score"); // This runs only when currentIndex changes
    } else {
      setSubmitText("Next Question");
    }

    // Check if selected answer matches the correct answer
    const isAnswerCorrect =
      currentQuestion.options[selectedOption] === currentQuestion.answer;

    // Check if the selected answer is correct
    if (isAnswerCorrect) {
      setScore(score + 1); // Increase the score by 1 for a correct answer
    }

    setIsCorrect(isAnswerCorrect);
    setIsSubmitted(true); // Mark the answer as submitted
  };

  // Redirect to final score page
  useEffect(() => {
    if (quizFinished) {
      let category = ""; // Default empty category

      // Determine category based on quizIndex
      switch (quizIndex) {
        case 0:
          category = "html";
          break;
        case 1:
          category = "css";
          break;
        case 2:
          category = "javascript";
          break;
        case 3:
          category = "accessibility";
          break;
      }
      router.push(`/${category}/final-score`);
    }
  }, [quizFinished, quizIndex, router]);

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      // Ensures that "Next Question" is only enabled when there's another question left
      setCurrentIndex(currentIndex + 1); // Move to next question
      setSelectedOption(null); // Reset selected option
      setIsSubmitted(false); // Enable options again
      setSubmitText("Submit Answer"); // Reset button text
      setIsCorrect(null); // Reset correctness state for the next question
    } else {
      setQuizFinished(true); // Mark quiz as finished when last qn is answered. It will trigger the useEffect and navigate
    }
  };

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-x-32 gap-y-8"
      role="main">
      <div>
        <p className="dark:text-light-bluish italic text-grey-navy">
          Question {currentIndex + 1} out of {questions.length}
        </p>
        <h3 className="dark:text-white mt-8 font-bold text-2xl md:text-3xl text-dark-navy">
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
            className={`dark:bg-navy dark:shadow-none group cursor-pointer p-4 flex gap-x-6 items-center shadow-md shadow-gray-200 bg-white rounded-xl
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
            <h2 className="dark:text-white text-2xl font-semibold text-dark-navy">{option}</h2>
            {selectedOption === index && isCorrect === true && (
              <Image src={correctIcon} alt="correct icon"></Image>
            )}
            {selectedOption === index && isCorrect === false && (
              <Image src={errorIcon} alt="error icon"></Image>
            )}
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
