import IPoint from "./IPoint";

export default interface IPositionable {
    position: IPoint;
    isWithinRect(position1: IPoint, position2: IPoint): boolean;
}