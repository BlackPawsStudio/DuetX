import { InputHTMLAttributes, ReactNode } from "react";

export const Range = (
  props: InputHTMLAttributes<HTMLInputElement> & {
    setTitle: ReactNode | ReactNode[];
  }
) => {
  return (
    <div className="text-white flex flex-col text-base animate-color">
      {props.setTitle}
      <input type="range" className="animate-color" {...props} />
    </div>
  );
};
