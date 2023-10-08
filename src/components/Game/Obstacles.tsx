import { useEffect, useRef } from "react";
import { Obstacle } from "../../game/Obstacle";
import { Percentage } from "../../types";

const drawAll = (
  ctx: CanvasRenderingContext2D,
  obstacles: Obstacle[],
  playerSize: number,
  rotationAngle: number,
  hitCounter: React.MutableRefObject<number>,
  speed: number,
  distance: number
) => {
  const canvas = ctx.canvas;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (hitCounter.current >= 0) {
    ctx.font = "normal 48px arial";
    ctx.fillText(hitCounter.current.toString(), canvas.width / 2, 50);
  }

  obstacles.forEach((obstacle, idx) => {
    const offset = idx * distance;
    const hasCollided = obstacle.checkCollision(
      playerSize,
      offset,
      rotationAngle
    );
    if (hasCollided) {
      ctx.fillStyle = hasCollided;
      if (hitCounter.current > 0) {
        localStorage.setItem("score", hitCounter.current.toString());
      }
      const highscore = localStorage.getItem("highscore");
      if (highscore && +highscore < hitCounter.current) {
        localStorage.setItem("highscore", hitCounter.current.toString());
      }
      if (!highscore) {
        localStorage.setItem("highscore", hitCounter.current.toString());
      }
      localStorage.setItem("score", hitCounter.current.toString());
      hitCounter.current = -1;
    }

    obstacle.drawObstacle(offset, speed);
    ctx.fillStyle = "white";
  });
};

const drawFrame = (
  ctx: CanvasRenderingContext2D | null | undefined,
  rotationAngle: number,
  obstacles: Obstacle[],
  playerSize: number,
  hitCounter: React.MutableRefObject<number>,
  speed: number,
  distance: number
) => {
  if (ctx && hitCounter.current >= 0) {
    requestAnimationFrame(() =>
      drawAll(
        ctx,
        obstacles,
        playerSize,
        rotationAngle,
        hitCounter,
        speed,
        distance
      )
    );
  }
};

export const Obstacles = ({
  rotationAngle,
  hitCounter,
  setGameEnd,
  obstacleSpeed,
  distance,
  rightLeftPerc,
  percentage,
}: {
  rotationAngle: React.MutableRefObject<number>;
  hitCounter: React.MutableRefObject<number>;
  setGameEnd: (end: boolean) => void;
  obstacleSpeed: number;
  distance: number;
  rightLeftPerc: number;
  percentage: Percentage;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const count = setInterval(() => {
      if (hitCounter.current >= 0) hitCounter.current += 1;
      else {
        clearInterval(count);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // const obstAmount = 1
        const obstAmount = Math.round(window.innerHeight / distance);
        const obstacles = new Array(obstAmount)
          .fill("")
          .map(
            () =>
              new Obstacle(
                Math.random() + percentage.short > 1
                  ? "short"
                  : Math.random() + percentage.square > 1
                  ? "square"
                  : "simple",
                Math.random() + rightLeftPerc > 1 ? "left" : "right",
                ctx,
                rightLeftPerc,
                percentage
              )
          );

        const playerSize = Math.round(
          canvas.width > canvas.height ? canvas.width / 25 : canvas.height / 10
        );

        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        const animation = setInterval(() => {
          drawFrame(
            ctx,
            rotationAngle.current,
            obstacles,
            playerSize,
            hitCounter,
            obstacleSpeed,
            distance
          );
          if (hitCounter.current < 0) {
            clearInterval(animation);
            setTimeout(() => {
              setGameEnd(true);
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            }, 1000);
          }
        }, 1000 / 60);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleResize = () => {
          if (ctx) {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
          }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
          clearInterval(animation);
        };
      }
    }
  }, [canvasRef.current]);

  console.log("obstacles rendered");
  return (
    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
  );
};
