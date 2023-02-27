import { useState } from "react";

function CostCalculator() {
  const [hourlyWage, setHourlyWage] = useState(25);
  const [hoursSpent, setHoursSpent] = useState(3);
  return (
    <section className="container mx-auto px-5 py-12" id="feature">
      <div className="mb-10 text-center">
        <h2 className="text-3xl capitalize font-semibold text-primary dark:text-gray-200 sm:text-3xl md:text-4xl">
          Crunch the numbers to see if its worth it
        </h2>
        <div className="mt-3 flex justify-center">
          <div className="inline-flex h-1 w-16 rounded-full bg-brand" />
        </div>
      </div>
      <div className="flex gap-5 rounded-lg bg-[#D9F9E2] p-7 dark:bg-gray-900 flex-col md:flex-row">
        <div className="w-full space-y-3">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold capitalize">Whats your hourly wage?</h3>
            <p className="text-xl">(Or yearly salary divided by 2,080)</p>
            <input
              type="text"
              placeholder="$24"
              className="w-full rounded bg-white p-3 dark:bg-gray-700 outline-none"
              value={hourlyWage}
              onChange={(e) => {
                if (e.currentTarget.value === "") {
                  setHourlyWage(0);
                  return;
                }
                const input = parseInt(e.currentTarget.value);
                setHourlyWage(input);
              }}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-medium">
              How many hours per month do you spend figuring out the right
              formula?
            </h3>
            <input
              type="text"
              placeholder="$3"
              className="w-full rounded bg-white p-3 dark:bg-gray-700 outline-none"
              value={hoursSpent}
              onChange={(e) => {
                if (e.currentTarget.value === "") {
                  setHoursSpent(0);
                  return;
                }
                const input = parseInt(e.currentTarget.value);
                setHoursSpent(input);
              }}
            />
          </div>
        </div>
        <div className="w-full space-y-3 rounded-lg bg-[#C5F3D1] p-5 text-center text-xl dark:bg-gray-600 dark:text-gray-300">
          <h3 className="capitalize">Excelformula costs</h3>
          <p className="text-2xl font-semibold text-brand">
            $ {hourlyWage * hoursSpent}/Month
          </p>
          <p>and your cost of time spent is...</p>
          <p>Input your information to the left.</p>
        </div>
      </div>
    </section>
  );
}

export default CostCalculator;
