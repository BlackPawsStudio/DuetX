import { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { Background } from './shared/Background';

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate()
  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      <Background />
      <header onClick={() => navigate('/')} className="animate-pulse text-white w-full text-center py-5 text-5xl absolute font-extralight tracking-widest">
        DUET<span className="animate-color font-bold">X</span>
      </header>
      <main className="h-full w-full">{children}</main>
      <footer className="text-white w-full text-center py-5 absolute bottom-0">
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
