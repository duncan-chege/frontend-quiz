import Image from "next/image"
import htmlIcon from "../public/icon-html.svg"
import cssIcon from "../public/icon-css.svg"
import jsIcon from "../public/icon-js.svg"
import accessibilityIcon from "../public/icon-accessibility.svg"


export default function HomeSection() {
  return (
    <div className="grid grid-cols-2 gap-x-32 py-28 px-36">
      <div>
        <h1 className="text-5xl font-light text-dark-navy">
          Welcome to the <span className="font-bold">Frontend Quiz!</span>
        </h1>
        <p className="mt-8 mb-4 text-grey-navy italic">Pick a subject to get started</p>
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="cursor-pointer p-4 flex gap-x-6 items-center shadow-md shadow-gray-200 bg-white rounded-xl">
          <Image src={htmlIcon} alt="html icon" className="p-2 bg-orange-100 rounded-md" />
          <h2 className="text-2xl font-semibold text-dark-navy">HTML</h2>
        </div>
        <div className="cursor-pointer p-4 flex gap-x-6 items-center shadow-md shadow-gray-200 bg-white rounded-xl">
          <Image src={cssIcon} alt="css icon" className="p-2 bg-emerald-100 rounded-md" />
          <h2 className="text-2xl font-semibold text-dark-navy">CSS</h2>
        </div>
        <div className="cursor-pointer p-4 flex gap-x-6 items-center shadow-md shadow-gray-200 bg-white rounded-xl">
          <Image src={jsIcon} alt="js icon" className="p-2 bg-blue-100 rounded-md" />
          <h2 className="text-2xl font-semibold text-dark-navy">Javascript</h2>
        </div>
        <div className="cursor-pointer p-4 flex gap-x-6 items-center shadow-md shadow-gray-200 bg-white rounded-xl">
          <Image src={accessibilityIcon} alt="accessibility icon" className="p-2 bg-violet-200 rounded-md" />
          <h2 className="text-2xl font-semibold text-dark-navy">Accessibility</h2>
        </div>
      </div>
    </div>
  );
}
