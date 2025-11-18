import { cn } from "@/lib/utils";

interface GrayBoxProps {
  size: number;
  rotateBy: string;
  isFilled: boolean;
  topBy: string;
  leftBy: string;
}
const GrayBox = ({ size, rotateBy, topBy, leftBy, isFilled }: GrayBoxProps) => {
  return (
    <div
      className={cn(
        `absolute z-[-1] border-10 border-gray-900/30`,
        isFilled && "bg-gray-900/30"
      )}
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
