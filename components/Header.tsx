"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import moonIcon from "@/public/icon-moon-dark.svg";
import sunIcon from "@/public/icon-sun-dark.svg";
import accessibilityIcon from "@/public/icon-accessibility.svg"

export default function Header() {
    const pathname = usePathname(); // Get the current route

    // Define titles and images based on the route
    const pageData: {[key:string]: { title: string; icon: string }} = {
        "/" : {title: "", icon: ""},
        "/accessibility": {title: "Accessibility", icon: accessibilityIcon },
    }

    // Set the heading based on the pathname, default to "". Destructuring the pageData object
    const { title, icon } = pageData[pathname] || {title: "", icon: ""}

  return (
    <header className="flex justify-between pb-12">
        <div className="flex items-center gap-x-4">
            {icon && <Image className="p-2 bg-fuchsia-100 rounded-md" src={icon} alt={`${title} icon`} />}
            <h1 className="text-xl md:text-2xl font-semibold text-dark-navy">{title}</h1>
        </div>
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
