import Canvas from './Canvas';
import EventLoop from './EventLoop';
import IDrawable from "./interfaces/IDrawable";
import IPositionable from "./interfaces/IPositionable";
import {NO_COLOUR} from "./constants";
import IPoint from "./interfaces/IPoint";

export default class Circle implements IDrawable, IPositionable {

    private constructor() {}
    private updateFn = () => {};

    canDraw = true;
    position:IPoint = {x:5, y:5};
    r = 20;
    fillColour = '#fffa00';
    strokeWidth = 0;
    shadowBlur = 0;
    strokeColour = NO_COLOUR;

    draw(): void {
        if(!this.canDraw)
            return;

        this.updateFn();

        Canvas.ctx.beginPath();
        Canvas.ctx.shadowColor = this.fillColour;
        Canvas.ctx.shadowBlur = this.shadowBlur;
        Canvas.ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI, false);

        if(this.fillColour !== NO_COLOUR){
            Canvas.ctx.fillStyle = this.fillColour;
            Canvas.ctx.fill();
        }

        if(this.strokeColour !== NO_COLOUR && this.strokeWidth > 0){
            Canvas.ctx.lineWidth = this.strokeWidth;
            Canvas.ctx.strokeStyle = this.strokeColour;
            Canvas.ctx.stroke();
        }
    }

    isWithinRect(pos1:IPoint, pos2:IPoint): boolean {
        return  (this.position.x - this.r) > pos1.x && (this.position.x + this.r) < pos2.x &&
                (this.position.y - this.r) > pos1.y && (this.position.y + this.r) < pos2.y;
    }

    setUpdateFn(fn: (c:Circle) => void) {
        this.updateFn = () => fn(this);
    }

    static create(x:number, y:number, r:number, canDraw:boolean=true): Circle {
        const c = new Circle();
        c.position.x = x;
        c.position.y = y;
        c.r = r;
        c.canDraw = canDraw;

        EventLoop.subscribe(c);

        return c;
    }
}