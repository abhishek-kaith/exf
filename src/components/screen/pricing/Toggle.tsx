import { Switch } from "@headlessui/react";

const Toggle = ({
  toogleState,
  setToogleState,
}: {
  toogleState: boolean;
  setToogleState: () => void;
}) => {
  return (
    <Switch
      checked={toogleState}
      onChange={setToogleState}
      className={`${toogleState ? "bg-brand" : "bg-teal-800"}
  relative inline-flex h-[30px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${toogleState ? "translate-x-9" : "translate-x-0"}
    pointer-events-none inline-block h-[26px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
};
export default Toggle;
