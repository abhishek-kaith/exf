import { useTheme } from "next-themes";
import React from "react";
import { RxMoon } from "react-icons/rx";
import { BiSun } from "react-icons/bi";

function ThemeChanger() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <button
      aria-label="Sun"
      className="text-xl text-brand md:text-2xl"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
    >
      {currentTheme === "dark" ? <BiSun /> : <RxMoon />}
    </button>
  );
}

export default ThemeChanger;
