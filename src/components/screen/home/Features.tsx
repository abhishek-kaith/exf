function Features() {
  return (
    <section className="container mx-auto px-5 py-12" id="feature">
      <div className="mb-10 space-y-3 text-center">
        <h2 className="text-3xl font-semibold capitalize text-primary dark:text-gray-200 sm:text-3xl md:text-4xl">
          Features
        </h2>
        <p className="mx-auto max-w-3xl">
          Excel Formula AI, offered by Excelformula.io, is a powerful tool that
          can help streamline your work processes and enhance your productivity.
          Heres what it can do for you:
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <FeatBox
          title="Generate Formulas"
          desc="With Excel Formula AI, you can quickly and easily generate complex formulas for Excel or Google Sheets with just a few clicks. Say goodbye to the hassle of trying to remember or look up formulas; the AI-powered tool can generate the formula you need in seconds based on your text instructions."
        />
        <FeatBox
          title="Explain Formulas"
          desc="Excel Formula AI not only generates formulas for you but also explains how each formula works. The tool provides a detailed breakdown of the formulas components and functions, making it easy for even novice users to understand and use. "
        />
        <FeatBox
          title="Debug Formulas"
          desc="Excel Formula AI can also help you debug formulas by highlighting errors and suggesting corrections. This feature can save you a lot of time and effort in the formula creation process, as it helps you identify and fix errors quickly and efficiently. "
        />
        <FeatBox
          title="Q&A"
          desc="Excel Formula AI also provides a Q&A feature that allows you to ask questions about formulas and get instant answers. This feature can be especially helpful for users who are new to formula creation or need help troubleshooting."
        />
      </div>
    </section>
  );
}

export default Features;
const FeatBox = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="space-y-2 md:p-5">
      <h3 className="text-2xl text-primary dark:text-gray-300">{title}</h3>
      <p className="text-lg">{desc}</p>
    </div>
  );
};
