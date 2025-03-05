export default function AccessibilityPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-32" role="main">
      <div>
        <p className="italic text-grey-navy">Question 6 out of 10</p>
        <h3 className="mt-8 font-bold text-3xl text-dark-navy">
          Which of these color contrast ratios defines the minimum WCAG 2.1
          Level AA requirement for normal text?
        </h3>
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="cursor-pointer p-4 flex gap-x-6 items-center shadow-md shadow-gray-200 bg-white rounded-xl">
          <p className="py-2 px-4 bg-light-grey rounded-md text-2xl font-bold text-grey-navy">A</p>
          <h2 className="text-2xl font-semibold text-dark-navy">4.5:1</h2>
        </div>
        <div className="cursor-pointer p-4 flex gap-x-6 items-center shadow-md shadow-gray-200 bg-white rounded-xl">
          <p className="py-2 px-4 bg-light-grey rounded-md text-2xl font-bold text-grey-navy">B</p>
          <h2 className="text-2xl font-semibold text-dark-navy">3:1</h2>
        </div>
        <div className="cursor-pointer p-4 flex gap-x-6 items-center shadow-md shadow-gray-200 bg-white rounded-xl">
          <p className="py-2 px-4 bg-light-grey rounded-md text-2xl font-bold text-grey-navy">C</p>
          <h2 className="text-2xl font-semibold text-dark-navy">2.5:1</h2>
        </div>
        <div className="cursor-pointer p-4 flex gap-x-6 items-center shadow-md shadow-gray-200 bg-white rounded-xl">
          <p className="py-2 px-4 bg-light-grey rounded-md text-2xl font-bold text-grey-navy">D</p>
          <h2 className="text-2xl font-semibold text-dark-navy">5:1</h2>
        </div>
        <button className="bg-purple cursor-pointer p-4 rounded-xl text-white text-lg"> Submit Answer </button>
      </div>
    </div>
  );
}
