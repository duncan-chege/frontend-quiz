"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the structure of the quiz context state
interface QuizContextType {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  selectedOption: number | null;
  setSelectedOption: (option: number | null) => void;
  isSubmitted: boolean;
  setIsSubmitted: (submitted: boolean) => void;
  score: number;
  setScore: (score: number) => void;
  quizFinished: boolean;
  setQuizFinished: (finished: boolean) => void;
  submitText: string;
  setSubmitText: (submitText: string) => void;
  errorMessage: string | null;
  setErrorMessage: (errorMessage: string | null) => void;
  isCorrect: boolean | null;
  setIsCorrect: (isCorrect: boolean | null) => void;
  totalQuestions: number;
  setTotalQuestions: (totalQuestions:number) => void;
}

// Create context with an undefined default value (will be provided later)
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Custom hook to use the quiz context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a Quiz Provider");
  }
  return context;
};

// Define the props for the provider
interface QuizProviderProps {
  children: ReactNode;
}

// Create the provider component
export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [submitText, setSubmitText] = useState<string>("Submit Answer");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // Stores if the answer is correct or incorrect
  const [totalQuestions, setTotalQuestions] = useState<number>(0);

  return (
    <QuizContext.Provider
      value={{
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
        totalQuestions,
        setTotalQuestions
      }}>
      {children}
    </QuizContext.Provider>
  );
};
