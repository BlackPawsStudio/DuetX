import {
  ObstacleDirection,
  ObstacleSide,
  ObstacleType,
  Percentage,
} from "../types";

export class Obstacle {
  type: ObstacleType;
  side: ObstacleSide;
  direction: ObstacleDirection;
  ctx: CanvasRenderingContext2D;
  y: number;
  percent: number;
  percentage: Percentage;

  constructor(
    type: ObstacleType,
    side: ObstacleSide,
    direction: ObstacleDirection,
    ctx: CanvasRenderingContext2D,
    percent: number,
    percentage: Percentage
  ) {
    this.type = type;
    this.side = side;
    this.direction = direction;
    this.ctx = ctx;
    this.y = this.direction === "down" ? 0 : window.innerHeight;
    this.percent = percent;
    this.percentage = percentage;
  }

  drawObstacle(offset: number, speed: number) {
    const canvas = this.ctx.canvas;
    const size = Math.round(
      canvas.width > canvas.height ? canvas.width / 10 : canvas.height / 5
    );

    if (this.direction === "down") {
      if (this.type === "short") {
        this.ctx.fillRect(
          canvas.width / 2 - size / 4,
          this.y - offset,
          size / 2,
          size / 7
        );
      } else {
        switch (this.side) {
          case "left":
            if (this.type === "square") {
              this.ctx.fillRect(
                canvas.width / 2 + size / 4,
                this.y - offset - size / 2.5 / 2,
                size / 2.5,
                size / 2.5
              );
            } else {
              this.ctx.fillRect(
                canvas.width / 2,
                this.y - offset,
                size,
                size / 7
              );
            }
            break;
          case "right":
            if (this.type === "square") {
              this.ctx.fillRect(
                canvas.width / 2 - size + size / 2.5,
                this.y - offset - size / 2.5 / 2,
                size / 2.5,
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
      }
      //  up direction
    } else {
      if (this.type === "short") {
        this.ctx.fillRect(
          canvas.width / 2 - size / 4,
          this.y + offset - size / 7,
          size / 2,
          size / 7
        );
      } else {
        switch (this.side) {
          case "left":
            if (this.type === "square") {
              this.ctx.fillRect(
                canvas.width / 2 + size / 4,
                this.y + offset - size / 2.5,
                size / 2.5,
                size / 2.5
              );
            } else {
              this.ctx.fillRect(
                canvas.width / 2,
                this.y + offset - size / 7,
                size,
                size / 7
              );
            }
            break;
          case "right":
            if (this.type === "square") {
              this.ctx.fillRect(
                canvas.width / 2 - size + size / 2.5,
                this.y + offset - size / 2.5,
                size / 2.5,
                size / 2.5
              );
            } else {
              this.ctx.fillRect(
                canvas.width / 2 - size,
                this.y + offset - size / 7,
                size,
                size / 7
              );
            }
            break;
        }
      }
    }

    if (this.direction === "down") {
      this.y += speed;
    } else {
      this.y -= speed;
    }

    //  reached end
    if (this.direction === "down") {
      if (this.y - offset - size / 7 > canvas.height) {
        this.direction =
          Math.random() + this.percentage.direction > 1 ? "up" : "down";
        this.direction === "down"
          ? (this.y = offset)
          : (this.y = canvas.height - offset);

        this.side = Math.random() + this.percent > 1 ? "left" : "right";
        this.type =
          Math.random() + this.percentage.short > 1
            ? "short"
            : Math.random() + this.percentage.square > 1
            ? "square"
            : "simple";
      }
    } else {
      if (this.y + offset + size / 7 < 0) {
        this.direction =
          Math.random() + this.percentage.direction > 1 ? "up" : "down";
        this.direction === "down"
          ? (this.y = offset)
          : (this.y = canvas.height - offset);

        this.side = Math.random() + this.percent > 1 ? "left" : "right";
        this.type =
          Math.random() + this.percentage.short > 1
            ? "short"
            : Math.random() + this.percentage.square > 1
            ? "square"
            : "simple";
      }
    }
  }

  checkCollision(radius: number, offset: number, rotationAngle: number) {
    const canvas = this.ctx.canvas;

    if (this.direction === "down") {
      if (this.type === "simple") {
        const heightL =
          canvas.height / 2 - radius * 7 * Math.sin(rotationAngle);

        const heightR =
          canvas.height / 2 + radius * 7 * Math.sin(rotationAngle);

        const angle = rotationAngle * (180 / Math.PI);

        const safeZone =
          this.side === "left"
            ? angle > 90 && angle < 270
            : angle < 90 || angle > 270;

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
        return false;
      }

      if (this.type === "square") {
        const size =
          Math.round(
            canvas.width > canvas.height ? canvas.width / 10 : canvas.height / 5
          ) / 2.5;

        const heightL =
          canvas.height / 2 - radius * 7 * Math.sin(rotationAngle);

        const heightR =
          canvas.height / 2 + radius * 7 * Math.sin(rotationAngle);

        const angle = rotationAngle * (180 / Math.PI);

        const midSafeZone =
          (angle > 71 && angle < 107) || (angle > 265 && angle < 288);

        const safeZone =
          this.side === "left"
            ? angle > 90 && angle < 270
            : angle < 90 || angle > 270;

        if (
          !midSafeZone &&
          safeZone &&
          heightL < this.y - offset + size - size / 2.5 - 10 &&
          heightL > this.y - offset - size / 2
        ) {
          return "#23acff";
        }
        if (
          !midSafeZone &&
          !safeZone &&
          heightR < this.y - offset + size - size / 2.5 - 10 &&
          heightR > this.y - offset - size / 2
        ) {
          return "red";
        }
        return false;
      }

      if (this.type === "short") {
        const heightL =
          canvas.height / 2 - radius * 7 * Math.sin(rotationAngle);

        const heightR =
          canvas.height / 2 + radius * 7 * Math.sin(rotationAngle);

        const angle = rotationAngle * (180 / Math.PI);

        const safeZone =
          angle < 37 || angle > 325 || (angle < 212 && angle > 140);

        if (
          !safeZone &&
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
        return false;
      }
    } else {
      if (this.type === "simple") {
        const heightL =
          canvas.height / 2 - radius * 7 * Math.sin(rotationAngle);

        const heightR =
          canvas.height / 2 + radius * 7 * Math.sin(rotationAngle);

        const angle = rotationAngle * (180 / Math.PI);

        const safeZone =
          this.side === "left"
            ? angle > 90 && angle < 270
            : angle < 90 || angle > 270;

        if (
          safeZone &&
          heightL - radius < this.y + offset &&
          heightL + radius > this.y + offset
        ) {
          return "#23acff";
        }
        if (
          !safeZone &&
          heightR - radius < this.y + offset &&
          heightR + radius > this.y + offset
        ) {
          return "red";
        }
        return false;
      }

      if (this.type === "square") {
        const size =
          Math.round(
            canvas.width > canvas.height ? canvas.width / 10 : canvas.height / 5
          ) / 2.5;

        const heightL =
          canvas.height / 2 - radius * 7 * Math.sin(rotationAngle);

        const heightR =
          canvas.height / 2 + radius * 7 * Math.sin(rotationAngle);

        const angle = rotationAngle * (180 / Math.PI);

        const midSafeZone =
          (angle > 65 && angle < 105) || (angle > 243 && angle < 295);

        const safeZone =
          this.side === "left"
            ? angle > 90 && angle < 270
            : angle < 90 || angle > 270;

        if (
          !midSafeZone &&
          safeZone &&
          heightL < this.y + offset &&
          heightL > this.y + offset - size / 2
        ) {
          return "#23acff";
        }
        if (
          !midSafeZone &&
          !safeZone &&
          heightR < this.y + offset &&
          heightR > this.y + offset - size / 2
        ) {
          return "red";
        }
        return false;
      }

      if (this.type === "short") {
        const heightL =
          canvas.height / 2 - radius * 7 * Math.sin(rotationAngle);

        const heightR =
          canvas.height / 2 + radius * 7 * Math.sin(rotationAngle);

        const angle = rotationAngle * (180 / Math.PI);

        const safeZone =
          angle < 37 || angle > 325 || (angle < 212 && angle > 140);

        if (
          !safeZone &&
          heightL - radius < this.y + offset &&
          heightL + radius > this.y + offset
        ) {
          return "#23acff";
        }
        if (
          !safeZone &&
          heightR - radius < this.y + offset &&
          heightR + radius > this.y + offset
        ) {
          return "red";
        }
        return false;
      }

      return false;
    }
  }
}
