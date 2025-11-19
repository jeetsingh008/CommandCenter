"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

interface GrayBoxProps {
  size: number;
  rotateBy: string;
  isFilled: boolean;
  topBy: string;
  leftBy: string;
}

const GrayBox = ({ size, rotateBy, topBy, leftBy, isFilled }: GrayBoxProps) => {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const themeClasses =
    mounted && isFilled
      ? cn(
          theme === "dark" && "bg-gray-900/30 border-gray-900/30",
          theme === "light" && "bg-gray-100/50 border-gray-100/50"
        )
      : "";

  return (
    <div
      className={cn(`absolute z-[-1] border-10`, themeClasses)}
      style={{
        height: size,
        width: size,
        rotate: rotateBy,
        top: topBy,
        left: leftBy,
      }}
    ></div>
  );
};

export default GrayBox;
