import React from 'react';

import * as T from './types';
import { MenuContext } from './context';

function calculatePoint(
  radius: number,
  angle: number,
  centerX: number,
  centerY: number,
  rotateBy: number = 0,
): T.Point {
  const rad = ((angle + rotateBy) * (2 * Math.PI)) / 360;

  return [
    centerX + radius * Math.cos(rad),
    centerY + radius * Math.sin(rad),
    angle + rotateBy,
  ];
}

function calculatePoints({
  size,
  points,
}: {
  size: number;
  points: number;
}): T.Point[] {
  const R = size / 2;
  const circlePoint = {
    x: R,
    y: R,
  };

  const slice = 360 / points;

  return new Array(points)
    .fill(null)
    .map((_, i) =>
      calculatePoint(R, i * slice, circlePoint.x, circlePoint.y, -90),
    );
}

function distanceOf(pointA: T.Point, pointB: T.Point): number {
  return Math.sqrt(
    Math.pow(pointB[0] - pointA[0], 2) + Math.pow(pointB[1] - pointA[1], 2),
  );
}

function translateBox(size: T.Size, point: T.Point, isEdge?: boolean): T.Point {
  const [width] = size;
  const half = width / 2;
  return [point[0] - half, point[1] - half, point[2]];
}

function translateEdge(
  pointA: T.Point,
  pointB: T.Point,
  angle: number,
  size: T.Size,
): T.Point {
  const [width, height] = size;
  const half = width / 2;

  return [
    (pointB[0] + pointA[0]) / 2 - half,
    (pointB[1] + pointA[1]) / 2 - height,
    angle,
  ];
}

interface CirclePoint {
  size: T.Size;
  isEdge?: boolean;
}

function useCirclePoints({
  containerSize,
  points,
}: {
  containerSize: number;
  points: CirclePoint[];
}): T.Point[] {
  return React.useMemo(
    () =>
      calculatePoints({ size: containerSize, points: points.length }).map(
        (point, i, all) => {
          if (points[i].isEdge) {
            const nextBox = i + 1 < all.length ? all[i + 1] : all[0];
            const prevBox = all[i - 1];

            return translateEdge(prevBox, nextBox, point[2], points[i].size);
          }

          return translateBox(points[i].size, point, false);
        },
      ),
    [containerSize, points],
  );
}

export function useCircleMenu({
  size,
  itemSize,
  menu,
  edge,
  edgeGap,
  edgeHeight,
}: {
  size: number;
  itemSize: number;
  menu: T.MenuItem[];
  edge: T.EdgeElement;
  edgeGap: number;
  edgeHeight: number;
}): T.CircleMenuItem[] {
  const correctSize = size - itemSize;
  const points = useCirclePoints({
    containerSize: correctSize,
    points: menu.map(_ => ({ size: [itemSize, itemSize] })),
  });
  const fullMenu = React.useMemo(() => {
    const newMenu: Array<CirclePoint & T.MenuItem> = [];

    menu.forEach((item, i) => {
      const hasNext = i + 1 < menu.length;
      const nextPoint = points[hasNext ? i + 1 : 0];
      const distance = distanceOf(nextPoint, points[i]);

      newMenu.push({
        element: item.element,
        size: [itemSize, itemSize],
        text: item.text,
      });
      newMenu.push({
        text: undefined,
        element: edge,
        size: [distance - edgeGap, edgeHeight],
        isEdge: true,
      });
    });

    return newMenu;
  }, [menu, points]);

  const newPoints = useCirclePoints({
    containerSize: correctSize,
    points: fullMenu,
  });

  return React.useMemo<T.CircleMenuItem[]>(() => {
    return newPoints.map((point, key) => {
      const item = fullMenu[key];
      return {
        point,
        ...item,
      };
    });
  }, [newPoints, fullMenu]);
}
