import { TiTick } from "react-icons/ti";
const ListItem = ({ text }: { text: string }) => {
  return (
    <div className="flex text-lg font-medium">
      <TiTick className="h-6 w-6 flex-shrink-0 text-2xl text-brand" />
      <span>{text}</span>
    </div>
  );
};

export default ListItem;
