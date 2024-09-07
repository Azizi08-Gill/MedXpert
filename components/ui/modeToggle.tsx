"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const initialTheme = React.useRef(theme);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`relative bg-transparent ${
        theme === "dark"
          ? "hover:bg-[#3d3d3d]"
          : "hover:bg-[rgba(200,200,200,1)]"
      }`}
    >
      {theme === "dark" ? (
        <MoonIcon className="h-[1.2rem] w-[1.2rem] text-white transition-transform transform rotate-90 stroke-2" />
      ) : (
        <SunIcon className="h-[1.2rem] w-[1.2rem] text-black transition-transform transform rotate-0 stroke-2" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}