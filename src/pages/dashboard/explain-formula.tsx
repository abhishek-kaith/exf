import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../../components/screen/dashboard/layout/Layout";
import { genrateTask } from "../../data/api/authApi";
import { GenTaskInput } from "../../data/schema";
import { StandardResponse } from "../../data/types/common";

function ExplainFormula() {
  const [type, setType] = useState<"Excel" | "Google Sheets">("Excel");
  const [input, setInput] = useState("");
  const { data, isLoading, mutate } = useMutation({
    mutationKey: ["genFormula"],
    mutationFn: (data: GenTaskInput) => genrateTask(data),
    onError: (error: AxiosError<StandardResponse>) => {
      if (!error.response) return;
      toast.error(error.response.data.message);
    },
  });
  return (
    <Layout>
      <form
        className="m-3 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (input === "" || input.length < 6) return;
          mutate({
            input,
            source: type,
            requestType: "Explain",
          });
        }}
      >
        <h1 className="text-3xl">Explain Formula</h1>
        <div className="space-y-2">
          <p>Is this formula for Excel or Google Sheets</p>
          <div className="space-x-5">
            <button
              onClick={() => setType("Excel")}
              type="button"
              className={`rounded-lg border px-4 py-1 ${
                type === "Excel" ? "border-transparent bg-brand text-white" : ""
              }`}
            >
              Excel
            </button>
            <button
              className={`rounded-lg border px-4 py-1 ${
                type === "Google Sheets"
                  ? "border-transparent bg-brand text-white"
                  : ""
              }`}
              onClick={() => setType("Google Sheets")}
              type="button"
            >
              Google Sheets
            </button>
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="prompt">Prompt</label>
          <div>
            <textarea
              onChange={(e) => {
                setInput(e.currentTarget.value);
              }}
              value={input}
              id="prompt"
              className="min-h-[50px] min-w-full rounded-lg bg-white px-5 py-6 outline-none dark:bg-gray-900"
              placeholder={` =SUM(A1:Z1)`}
            />
          </div>
        </div>
        <p className="text-sm text-red-600">
          {input !== "" && input.length < 3 && "Prompt is too short"}
        </p>
        <button className="rounded bg-brand py-3  px-4 text-white">
          {isLoading ? "generating.." : "Explain"}
        </button>
        <div>{data && <p className="text-lg">{data.output}</p>}</div>
      </form>
    </Layout>
  );
}

export default ExplainFormula;
