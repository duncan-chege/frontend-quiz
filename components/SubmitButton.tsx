import Image from "next/image";
import errorIcon from "@/public/icon-error.svg";

interface SubmitButtonProps {
  submitText: string;
  submitAnswer: () => void;
  errorMessage: string | null;
  isSubmitted: boolean;
  nextQuestion: () => void;
}

export default function SubmitButton({
  submitText,
  submitAnswer,
  errorMessage,
  isSubmitted,
  nextQuestion
}: SubmitButtonProps) {
  return (
    <div>
      <button
        className="hover:bg-fuchsia-400 w-full bg-purple cursor-pointer p-4 rounded-xl text-white text-lg"
        onClick={isSubmitted ? nextQuestion : submitAnswer }>
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