import { useNavigate } from "react-router";
import { Button } from "../shared/Button";

export const MenuPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex items-center justify-center">
      {(() => {
        const highscore = localStorage.getItem("highscore");
        if (highscore) {
          return (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[350%] text-white text-2xl">
              Highscore: {highscore}
            </div>
          );
        }
      })()}
      <Button onClick={() => navigate("/game")}>
        <span className="absolute border-l-[30px] top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 border-[15px] border-transparent border-l-white w-[0px] h-[0px] " />
      </Button>
    </div>
  );
};
