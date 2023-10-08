import { ButtonHTMLAttributes } from "react";

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`border-2 border-white bg-transparent text-white p-7 w-[10vh] h-[10vh] relative text-lg hover:scale-150 active:scale-95 rounded-full ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </button>
  );
};
