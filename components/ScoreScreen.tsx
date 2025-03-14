import { usePathname } from "next/navigation";
import accessibilityIcon from "@/public/icon-accessibility.svg";
import Image from "next/image";

interface Question {
    question: string;
    options: string[];
    answer: string;
  }

interface ScoreScreenProps {
    score: number;
    questions: Question[]
}

export default function ScoreScreen({score, questions}: ScoreScreenProps) {

  const pathname = usePathname(); // Get the current route

  const pageData: { [key: string]: { title: string; icon: string } } = {
    "/": { title: "", icon: "" },
    "/accessibility": { title: "Accessibility", icon: accessibilityIcon },
  };

  const { title, icon } = pageData[pathname];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-32" role="main">
      <div>
        <h1 className="text-5xl font-light text-dark-navy">
          Quiz Completed <span className="font-bold">You Scored...</span>
        </h1>
      </div>
      <div className="shadow-md shadow-gray-200 bg-white rounded-xl">
        <div className="flex items-center gap-x-4">
          <Image
            className="p-2 bg-fuchsia-100 rounded-md"
            src={icon}
            alt={`${title} icon`}
          />
          <h1 className="text-xl md:text-2xl font-semibold text-dark-navy">
            {title}
          </h1>
        </div>
        <p className="font-bold text-6xl">{score}</p>
        <p className="text-grey-navy">out of {questions.length}</p>
        <button className="hover:bg-fuchsia-400 w-full bg-purple cursor-pointer p-4 rounded-xl text-white text-lg">Play Again</button>
      </div>
    </div>
  );
}
