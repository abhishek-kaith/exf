import React from "react";

function StatCard({
  title,
  stat,
  colorCode,
}: {
  stat: number;
  title: string;
  colorCode: string;
}) {
  return (
    <div className="transform overflow-hidden rounded bg-white shadow-lg transition duration-500 hover:scale-100 hover:shadow-2xl dark:bg-gray-900">
      <div
        style={{ backgroundColor: colorCode, color: "white" }}
        className="flex h-20 items-center  justify-between bg-gray-200 dark:bg-gray-700"
      >
        <p className="mr-0 pl-5 text-lg">{title}</p>
      </div>
      <div className="mb-2 flex justify-between px-5 pt-6 text-sm text-gray-600 dark:text-gray-400">
        <p>TOTAL</p>
      </div>
      <p className="ml-5 py-4 text-3xl">{stat}</p>
    </div>
  );
}

export default StatCard;
