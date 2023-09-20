import { useEffect, useRef } from 'react';

const drawRect = (
  { size, angle, width, amount }: { size: number; angle?: number; width: number; amount?: number },
  ctx: CanvasRenderingContext2D
) => {
  const canvas = ctx.canvas;
  if (typeof angle === 'number') {
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((15 * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
  }
  ctx.fillStyle = '#191919';
  ctx.fillRect(canvas.width / 2 - size / 2, canvas.height / 2 - size / 2, size, size);
  ctx.fillStyle = 'black';
  ctx.fillRect(
    canvas.width / 2 - (size - width) / 2,
    canvas.height / 2 - (size - width) / 2,
    size - width,
    size - width
  );
};

const draw = (ctx: CanvasRenderingContext2D) => {
  const canvas = ctx.canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const amount = Math.round((canvas.width > canvas.height ? canvas.width : canvas.height) / 50);
  new Array(amount).fill('').forEach((_, idx) =>
    drawRect(
      {
        size: (amount - idx) * 50,
        width: (amount - idx) * 2.5,
        angle: idx,
        amount,
      },
      ctx
    )
  );
  // reset turn angle
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(-(((15 * Math.PI) / 180) * amount));
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  // rotate
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((1 * Math.PI) / 180);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  setTimeout(() => requestAnimationFrame(() => draw(ctx)), 1000 / 60);
};

export const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        requestAnimationFrame(() => draw(ctx));

        const handleResize = () => {
          ctx.canvas.height = window.innerHeight;
          ctx.canvas.width = window.innerWidth;
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
      }
    }
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>;
};
