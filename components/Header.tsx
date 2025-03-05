import Image from "next/image";
import moonIcon from "@/public/icon-moon-dark.svg";
import sunIcon from "@/public/icon-sun-dark.svg";

export default function Header() {
  return (
    <header className="flex justify-between pb-20">
      <h1 className="text-2xl font-semibold text-dark-navy">Accessibility</h1>
      <div className="flex items-center gap-x-2">
        <Image src={sunIcon} alt="the sun icon" />
        <label
          htmlFor="check"
          className="flex bg-purple cursor-pointer relative w-12 h-6 rounded-full">
          <input type="checkbox" id="check" className="sr-only peer" />
          <span className="w-2/5 h-4/5 bg-white absolute rounded-full left-1 top-[2px] peer-checked:bg-white peer-checked:left-6 transition-all duration-500"></span>
        </label>
        <Image src={moonIcon} alt="the moon icon" />
      </div>
    </header>
  );
}
