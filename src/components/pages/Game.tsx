import { useRef, useState } from "react";
import { Player } from "../Game/Player";
import { Obstacles } from "../Game/Obstacles";
import { Background } from "../shared/Background";
import { Button } from "../shared/Button";
import { useNavigate } from "react-router";
import { Range } from "../shared/Range";

export const GamePage = () => {
  const rotation = useRef<number>(0);

  const [speed, setSpeed] = useState<number>(1.1);
  const [distance, setDistance] = useState<number>(150);
  const [rightLeftPerc, setRightLeftPerc] = useState<number>(0.5);
  const [shortPerc, setShortPerc] = useState<number>(0);
  const [squarePerc, setSquarePerc] = useState<number>(1);

  const rotationAngle = useRef<number>(0);

  const setRotationAngle = (angle: number) => {
    rotationAngle.current = angle;
  };

  const navigate = useNavigate();

  const hitCounter = useRef<number>(0);
  const [gameEnd, setGameEnd] = useState<boolean>(false);

  return typeof rotation.current === "number" &&
    typeof rotationAngle.current === "number" ? (
    <>
      <Background />
      {gameEnd ? (
        <div className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center gap-5">
          <div className="text-2xl text-white">
            YOU LOSE. Your score is {localStorage.getItem("score")}
          </div>
          <div className="text-white animate-pulse">
            {(() => {
              const highscore = localStorage.getItem("highscore");
              const score = localStorage.getItem("score");
              if (!highscore && score) {
                return "NEW HIGHSCORE!";
              }
              if (highscore && score) {
                if (+highscore <= +score) {
                  return "NEW HIGHSCORE!";
                }
                if (+highscore > +score) {
                  return `${
                    highscore && score ? +highscore - +score : 0
                  } points away from highscore`;
                }
              }
            })()}
          </div>
          <div className="flex gap-6 mb-3">
            <Button
              className="relative h-[90px] w-[90px] p-5"
              onClick={() => {
                hitCounter.current = 0;
                rotation.current = 0;
                rotationAngle.current = 0;
                setGameEnd(false);
              }}
            >
              <div className="absolute border-l-[10px] rotate-45 top-8 right-5 border-[5px] border-transparent border-l-white w-[0px] h-[0px] " />
              <div className="rounded-full border-2 border-white w-full h-full border-r-transparent" />
            </Button>
            <Button
              className="h-[90px] w-[90px] !p-0"
              onClick={() => {
                navigate("/");
              }}
            >
              MENU
            </Button>
          </div>
          <div className="flex text-white text-xl flex-col gap-3">
            SETTINGS:
            <Range
              setTitle={`Game speed: ${speed}x`}
              min={0.5}
              max={2}
              step={0.1}
              defaultValue={speed}
              onChange={(e) => {
                setSpeed(+e.target.value);
              }}
            />
            <Range
              setTitle={`Obstacle distance: ${distance}`}
              min={150}
              max={300}
              step={10}
              defaultValue={distance}
              onChange={(e) => {
                setDistance(+e.target.value);
              }}
            />
            <Range
              setTitle={
                <div className="flex w-full justify-between">
                  <div>Left</div>
                  <div>Right</div>
                </div>
              }
              className="appearance-none h-[7px] rounded-full shadow-sm"
              min={0}
              max={1}
              step={0.1}
              defaultValue={rightLeftPerc}
              onChange={(e) => {
                setRightLeftPerc(+e.target.value);
              }}
            />
            <Range
              setTitle={"Short obstacle chance: " + shortPerc + "%"}
              min={0}
              max={1}
              step={0.1}
              defaultValue={shortPerc}
              onChange={(e) => {
                setShortPerc(+e.target.value);
              }}
            />
            <Range
              setTitle={"Square obstacle chance: " + squarePerc + "%"}
              min={0}
              max={1}
              step={0.1}
              defaultValue={squarePerc}
              onChange={(e) => {
                setSquarePerc(+e.target.value);
              }}
            />
          </div>
        </div>
      ) : (
        <>
          <Player
            speed={speed}
            rotation={rotation}
            setRotationAngle={setRotationAngle}
            hitCounter={hitCounter}
          />
          <Obstacles
            hitCounter={hitCounter}
            rotationAngle={rotationAngle}
            setGameEnd={setGameEnd}
            obstacleSpeed={speed * 4.1818}
            distance={distance}
            rightLeftPerc={rightLeftPerc}
            percentage={{
              short: shortPerc,
              square: squarePerc,
            }}
          />
        </>
      )}
    </>
  ) : null;
};
