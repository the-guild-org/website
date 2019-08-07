import React from 'react';

export type Point = [number, number, number];
export type Size = [number, number];
export type MenuItem = {
  text: string;
  element: React.FunctionComponent<{
    point: Point;
    size: Size;
  }>;
};
export type EdgeElement = React.FunctionComponent<{
  point: Point;
  size: Size;
}>;

export type CircleMenuItem = {
  point: Point;
  size: Size;
  element: React.FunctionComponent<{
    point: Point;
    size: Size;
  }>;
  isEdge?: boolean;
  text?: string;
};
