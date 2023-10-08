import { ObstacleSide, ObstacleType, Percentage } from "../types";

export class Obstacle {
  type: ObstacleType;
  side: ObstacleSide;
  ctx: CanvasRenderingContext2D;
  y: number;
  percent: number;
  percentage: Percentage;

  constructor(
    type: ObstacleType,
    side: ObstacleSide,
    ctx: CanvasRenderingContext2D,
    percent: number,
    percentage: Percentage
  ) {
    this.type = type;
    this.side = side;
    this.ctx = ctx;
    this.y = 0;
    this.percent = percent;
    this.percentage = percentage;
  }

  drawObstacle(offset: number, speed: number) {
    const canvas = this.ctx.canvas;
    const size = Math.round(
      canvas.width > canvas.height ? canvas.width / 10 : canvas.height / 5
    );
    switch (this.side) {
      case "left":
        if (this.type === "square") {
          this.ctx.fillRect(
            canvas.width / 2,
            this.y - offset,
            size,
            size / 2.5
          );
        } else {
          this.ctx.fillRect(canvas.width / 2, this.y - offset, size, size / 7);
        }
        break;
      case "right":
        if (this.type === "square") {
          this.ctx.fillRect(
            canvas.width / 2 - size,
            this.y - offset,
            size,
            size / 2.5
          );
        } else {
          this.ctx.fillRect(
            canvas.width / 2 - size,
            this.y - offset,
            size,
            size / 7
          );
        }
        break;
    }
    this.y += speed;

    //  reached end
    if (this.y - offset - size / 7 > canvas.height) {
      this.y = offset;
      this.side = Math.random() + this.percent > 1 ? "left" : "right";
      this.type =
        Math.random() + this.percentage.short > 1
          ? "short"
          : Math.random() + this.percentage.square > 1
          ? "square"
          : "simple";
    }
  }

  checkCollision(radius: number, offset: number, rotationAngle: number) {
    const canvas = this.ctx.canvas;

    const size = Math.round(
      canvas.width > canvas.height ? canvas.width / 10 : canvas.height / 5
    );

    const heightL = canvas.height / 2 - radius * 7 * Math.sin(rotationAngle);

    const heightR = canvas.height / 2 + radius * 7 * Math.sin(rotationAngle);

    const angle = rotationAngle * (180 / Math.PI);
    const safeZone =
      this.side === "left"
        ? angle > 90 && angle < 270
        : angle < 90 || angle > 270;

    //  simple
    if (this.type === "simple") {
      if (
        safeZone &&
        heightL - radius < this.y - offset &&
        heightL + radius > this.y - offset
      ) {
        return "#23acff";
      }
      if (
        !safeZone &&
        heightR - radius < this.y - offset &&
        heightR + radius > this.y - offset
      ) {
        return "red";
      }
      //  square
    } else if (this.type === "square") {
      if (
        safeZone &&
        heightL < this.y - offset + size / 2.5 &&
        heightL > this.y - offset - 10
      ) {
        return "#23acff";
      }
      if (
        !safeZone &&
        heightR < this.y - offset + size / 2.5 &&
        heightR > this.y - offset - 10
      ) {
        return "red";
      }
    }
    return false;
  }
}
