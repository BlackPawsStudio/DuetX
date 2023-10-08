import { useEffect, useRef } from "react";

const draw = (
  ctx: CanvasRenderingContext2D,
  angle: number,
  setRotationAngle: (angle: number) => void
) => {
  const canvas = ctx.canvas;
  const size = Math.round(
    canvas.width > canvas.height ? canvas.width / 25 : canvas.height / 10
  );
  const ballSize = size / 7;

  if (angle !== 0) {
    const transform = ctx.getTransform();
    let rad = Math.atan2(transform.b, transform.a);
    if (rad < 0) rad = rad + Math.PI * 2;
    setRotationAngle(rad);
  }

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, size + ballSize + 1, 0, 360);
  ctx.strokeStyle = "#00000020";
  ctx.fillStyle = "#00000020";
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
  ctx.lineWidth = 1;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((angle * 5 * Math.PI) / 180);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, size, 0, 360);
  ctx.strokeStyle = "#555";
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(canvas.width / 2 + size, canvas.height / 2, ballSize, 0, 360);
  ctx.strokeStyle = "red";
  ctx.fillStyle = "red";
  ctx.stroke();
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(canvas.width / 2 - size, canvas.height / 2, ballSize, 0, 360);
  ctx.strokeStyle = "#23acff";
  ctx.fillStyle = "#23acff";
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
  // setTimeout(() => requestAnimationFrame(() => draw(ctx, angle)), 1000 / 60);
};

const drawFrame = (
  ctx: CanvasRenderingContext2D | null | undefined,
  rotation: number,
  setRotationAngle: (angle: number) => void, 
) => {
  ctx && requestAnimationFrame(() => draw(ctx, rotation, setRotationAngle));
  // const handleResize = () => {
};

export const Player = ({
  rotation,
  setRotationAngle,
  hitCounter,
  speed
}: {
  rotation: React.MutableRefObject<number>;
  setRotationAngle: (angle: number) => void;
  hitCounter: React.MutableRefObject<number>;
  speed: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const leftKeyDown = useRef<boolean>(false);
  const rightKeyDown = useRef<boolean>(false);

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    divRef.current && divRef.current.focus();
  }, [divRef]);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const animation = setInterval(() => {
        drawFrame(ctx, rotation.current, setRotationAngle);
        if (hitCounter.current < 0) clearInterval(animation);
      }, 1000 / 60);
      canvasRef.current.height = window.innerHeight;

      canvasRef.current.width = window.innerWidth;
      const handleResize = () => {
        if (ctx) {
          ctx.canvas.height = window.innerHeight;
          ctx.canvas.width = window.innerWidth;
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        clearInterval(animation);
      };
    }
  }, [canvasRef.current]);

  console.log("player rendered");
  return (
    <div
      className="w-full h-full absolute top-0 left-0 focus:outline-none"
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === "a" || e.key === "ArrowLeft") {
          rotation.current = -speed;
          leftKeyDown.current = true;
        }
        if (e.key.toLowerCase() === "d" || e.key === "ArrowRight") {
          rotation.current = speed;
          rightKeyDown.current = true;
        }
      }}
      onKeyUp={(e) => {
        rotation.current = 0;

        if (e.key.toLowerCase() === "a" || e.key === "ArrowLeft") {
          leftKeyDown.current = false;
          if (rightKeyDown.current) {
            rotation.current = speed;
          }
        }
        if (e.key.toLowerCase() === "d" || e.key === "ArrowRight") {
          rightKeyDown.current = false;
          if (leftKeyDown.current) {
            rotation.current = -speed;
          }
        }
      }}
      onMouseUp={() => (rotation.current = 0)}
      onPointerUp={() => (rotation.current = 0)}
      onPointerLeave={() => (rotation.current = 0)}
      tabIndex={0}
      ref={divRef}
    >
      <div className="absolute top-0 left-0 w-full h-full flex z-30">
        <div
          className="w-1/2 h-full"
          onMouseDown={() => {
            rotation.current = -speed;
          }}
          onPointerDown={() => {
            rotation.current = -speed;
          }}
        />
        <div
          className="w-1/2 h-full"
          onMouseDown={() => {
            rotation.current = speed;
          }}
          onPointerDown={() => {
            rotation.current = speed;
          }}
        />
      </div>
      <canvas
        ref={canvasRef}
        className="absolute top-0 z-0 left-0 w-full h-full"
      />
    </div>
  );
};
