import Image from "next/image";
import errorIcon from "@/public/icon-error.svg";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface SubmitButtonProps {
  submitText: string;
  submitAnswer: () => void;
  errorMessage: string | null;
  currentIndex: number;
  questions: Question[];
}

export default function SubmitButton({
  submitText,
  submitAnswer,
  errorMessage,
  currentIndex,
  questions,
}: SubmitButtonProps) {
  return (
    <div>
      <button
        className="hover:bg-fuchsia-400 w-full bg-purple cursor-pointer p-4 rounded-xl text-white text-lg"
        onClick={submitAnswer}
        disabled={currentIndex >= questions.length -1}>
        {submitText}
      </button>

      {errorMessage && (
        <p className="text-red mt-4 flex justify-center items-center gap-2">
            <Image src={errorIcon} alt="the error icon"></Image>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
