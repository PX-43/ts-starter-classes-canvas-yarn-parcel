import Circle from './Circle';
import Canvas from './Canvas';

Canvas.background = '#3b3336';

const circle = Circle.create(Canvas.centre.x, Canvas.centre.y, 4);
circle.shadowBlur = 7;
circle.fillColour = '#ff4652';

