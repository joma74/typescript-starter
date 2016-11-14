export interface Point2D {
    x: number;
    y: number;
}

export interface Point3D {
    x: number;
    y: number;
    z: number;
}

export function iTakePoint2D(point: Point2D): string {
    return JSON.stringify(point);
}
