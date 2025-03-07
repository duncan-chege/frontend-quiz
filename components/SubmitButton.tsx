"use client";

import { useState } from "react";

export default function SubmitButton() {
  const [submit, setSubmit] = useState<String>("Submit Answer");

  const submitAnswer = () => {
    setSubmit("Next Question");
  }
  
  return (
    <button
      className="hover:bg-fuchsia-400 bg-purple cursor-pointer p-4 rounded-xl text-white text-lg"
      onClick={submitAnswer}>
      {submit}
    </button>
  );
}
