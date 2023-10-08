import { Circle, Rectangle } from "./types";

export const CheckColliding = (circle: Circle, rect: Rectangle) => {
  // const distX = Math.abs(circle.x - rect.x - rect.w / 2);
  // const distY = Math.abs(circle.y - rect.y - rect.h / 2);

  // if (distX > rect.w / 2 + circle.r) {
  //   return false;
  // }
  // if (distY > rect.h / 2 + circle.r) {
  //   return false;
  // }

  // if (distX <= rect.w / 2) {
  //   return true;
  // }
  // if (distY <= rect.h / 2) {
  //   return true;
  // }

  // const dx = distX - rect.w / 2;
  // const dy = distY - rect.h / 2;
  // return dx * dx + dy * dy <= circle.r * circle.r;
  const rectRightX = rect.x + rect.w;
  const rectBottomY = rect.y + rect.h;

  const circleLeftX = circle.x - circle.r;
  const circleRightX = circle.x + circle.r;
  const circleTopY = circle.y - circle.r; 
  const circleBottomY = circle.y + circle.r;

  if (circleLeftX > rectRightX) {
    return false;
  }
  if (circleRightX < rect.x) {
    return false;
  }
  if (circleTopY > rectBottomY) {
    return false;
  }
  if (circleBottomY < rect.y) {
    return false;
  }
  return true;
}
