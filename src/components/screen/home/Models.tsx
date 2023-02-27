export default function Models() {
  return (
    <section className="container mx-auto px-5 py-12">
      <div className="mb-4 text-center">
        <h2 className="mx-auto capitalize max-w-4xl text-center text-3xl font-bold text-primary dark:text-gray-200 sm:text-3xl md:text-4xl">
          The AI-powered Excel & Google Sheets Bots are up for any challenge
        </h2>
      </div>
      <div className="justify-center gap-2 flex flex-col md:flex-row">
        <Card mode="Easy" color="#4CAF50" qus="Average of column A" ans="=AVERAGE(A:A)"/>
        <Card mode="Medium" color="#CBBB2D"qus={`Sum of column A when column B contains the word "marketing" and column C is today's date.`} ans={`=SUMIFS(A:A,B:B,"*marketing*",C:C,TODAY())`} />
        <Card mode="Hard" color="#C96F2E" qus={`Extract the fourth word in A1 only when cell B1 is greater than 100 and when C1 starts with the word "hello" and ends with the word "goodbye".`} ans={`=IF(AND(B1>100,REGEXMATCH(C1,"^hello.*goodbye$")),REGEXEXTRACT(A1,"\w+\s\w+\s\w+\s(\w+)"),)`}/>
      </div>
    </section>
  );
}

const Card = ({ mode, color, qus, ans }: { mode: string; color: string; qus:string; ans:string }) => {
  return (
    <div className="w-full overflow-hidden rounded-lg">
      <div style={{ backgroundColor: color }} className={` p-5`}>
        <h3 className="text-center text-2xl font-semibold text-white md:text-3xl">
          {mode}
        </h3>
      </div>
      <div className="flex min-h-[300px] flex-col break-all  justify-between bg-gray-200 p-5 text-center text-lg dark:bg-gray-900">
        <p>{qus}</p>
        <div className="h-[100px]">
          <p>{ans}</p>
        </div>
      </div>
    </div>
  );
};
