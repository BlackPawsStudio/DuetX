import { ReactNode } from "react";

interface RangeProps {
  title: ReactNode | ReactNode[];
  className?: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Range = ({ ...props }: RangeProps) => {
  return (
    <div className="text-white flex flex-col text-base animate-color">
      {props.title}
      <input
        type="range"
        className={`animate-color ${props.className ? props.className : ""}}`}
        min={props.min}
        max={props.max}
        step={props.step}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      />
    </div>
  );
};
