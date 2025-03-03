import Image from "next/image";
import moonIcon from "@/public/icon-moon-light.svg"
import sunIcon from "@/public/icon-sun-light.svg"

export default function Header(){
    return (
        <header className="flex justify-end pb-20">
           <label htmlFor="check" className="flex bg-purple cursor-pointer relative w-12 h-6 rounded-full">
                <input type="checkbox" id="check" className="sr-only peer" />
                <span className="w-2/5 h-4/5 bg-white absolute rounded-full left-1 top-[2px] peer-checked:bg-white peer-checked:left-6 transition-all duration-500"></span>
            </label> 
        </header>
    );
}