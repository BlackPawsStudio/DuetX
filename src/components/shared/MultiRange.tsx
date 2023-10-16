import { ReactNode } from "react";

interface MultiRangeProps {
  title: ReactNode | ReactNode[];
  min: number;
  max: number;
  step: number;
  value: number[];
  onChange: ((e: React.ChangeEvent<HTMLInputElement>) => void)[];
}

export const MultiRange = ({
  title,
  min,
  max,
  step,
  value,
  onChange,
}: MultiRangeProps) => {
  return (
    <div className="text-white flex flex-col text-base animate-color">
      {title}
      <div className="flex rounded-full relative mt-3">
        {value.map((v, idx) => (
          <input
            className="appearance-none h-[7px] absolute w-full transition-none rounded-full shadow-sm"
            key={idx}
            type="range"
            style={{
              left: `${
                typeof value[idx - 1] === "number"
                  ? value[idx - 1] * 100 + 5
                  : 0
              }%`,
              width: `${
                (value[idx - 1] ? max - value[idx - 1] : 1) * 100 - 5
              }%`,
            }}
            min={min}
            max={max - (value[idx - 1] || 0)}
            step={step}
            defaultValue={v}
            onChange={onChange.at(idx) || (() => {})}
          />
        ))}
      </div>
    </div>
  );
};
