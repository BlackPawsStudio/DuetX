export type ObstacleSide = "left" | "right";
export type ObstacleType = "simple" | "short" | "square";
export type ObstacleDirection = "up" | "down";

export interface Rectangle {
  w: number;
  h: number;
  x: number;
  y: number;
}

export interface Circle {
  x: number;
  y: number;
  r: number;
}

export interface Percentage {
  short: number;
  square: number;
  direction: number;
}
