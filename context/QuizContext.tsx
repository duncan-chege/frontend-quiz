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
      }}>
      {children}
    </QuizContext.Provider>
  );
};
