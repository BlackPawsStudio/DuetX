import { useEffect } from 'react';

export const Player = ({ ctx }: { ctx: CanvasRenderingContext2D }) => {
  useEffect(() => {
    console.log(ctx)
    const canvas = ctx.canvas;
    ctx.beginPath();
    ctx.strokeStyle = '#333';
    ctx.arc(canvas.width / 2, canvas.height / 2, 60, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'red';
    ctx.arc(canvas.width / 2, canvas.height / 2 + 60, 10, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }, []);
  return <>Player Loaded</>;
};
