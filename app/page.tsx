import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-x-32 py-28 px-36 bg-cover bg-center min-h-screen bg-[url('/pattern-background-desktop-light.svg')]">
      <div>
        <h1 className="text-5xl font-light text-dark-navy">
          Welcome to the <span className="font-bold">Frontend Quiz!</span>
        </h1>
        <p className="mt-8 mb-4 text-grey-navy italic">Pick a subject to get started</p>
      </div>
    </div>
  );
}
