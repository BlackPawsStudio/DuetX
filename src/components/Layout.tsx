import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { Background } from "./shared/Background";

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      <Background />
      <header
        onClick={() => navigate("/")}
        className="animate-pulse z-20 text-white w-full cursor-pointer text-center py-5 text-5xl absolute font-extralight tracking-widest"
      >
        <h1>
          DUET<span className="animate-color font-bold">X</span>
        </h1>
      </header>
      <main className="absolute top-0 left-0 h-full w-full z-10">
        {children}
      </main>
      <footer className="text-white w-full text-center py-5 absolute bottom-0 z-20">
        <a
          href="https://play.google.com/store/apps/details?id=com.kumobius.android.duet&hl=en_US"
          className="underline"
          target="blank"
        >
          Original game by Kumobius
        </a>
      </footer>
    </div>
  );
};
