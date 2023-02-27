function PastRequestCard({input,output,source, date}:{
  input:string,
  output:string,
  source:string,
  date: string,
}) {
  return (
    <div className="rounded bg-gray-200/70 p-4 dark:bg-gray-700/70">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <InnerBox heading="Input" content={input} />
        <InnerBox heading="Output" content={output}/>
        <InnerBox heading="Source" content={source} />
        <InnerBox heading="Date" content={date} />
      </div>
    </div>
  );
}

export default PastRequestCard;

const InnerBox = ({
  heading,
  content,
}: {
  heading: string;
  content: string;
}) => {
  return (
    <div className="space-y-1  break-all">
      <p className="font-semibold text-gray-600 dark:text-gray-400">
        {heading}
      </p>
      <p className="font-medium text-black dark:text-white">{content}</p>
    </div>
  );
};
