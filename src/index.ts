interface Shape {
    draw(): void;
}
class Point implements Shape {
    static readonly minValue = -100;
    static readonly maxValue = 100;
    static checkValue(value: number) {
        if (value < Point.minValue || value > Point.maxValue) {
            throw `wrong value ${value}, should be in range [${Point.minValue} - ${Point.maxValue}]`
        }
    }
    constructor(private _x: number, private _y: number) {
        Point.checkValue(_x);
        Point.checkValue(_y);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    set x(value: number) {
        Point.checkValue(value);
        this._x = value;
    }
    set y(value: number) {
        Point.checkValue(value);
        this._y = value;
    }
    draw(): void {
        console.log(`Point [x: ${this._x}, y: ${this._y}]`)
    }

}
class Line extends Point {
    constructor(x: number, y: number, private _point: Point) {
        super(x, y);
    }
    draw() {
        console.log("-----------Line----------")
        super.draw();
        this._point.draw();
        console.log('-'.repeat(20));
    }
    get point() {
        return this._point;
    }
}
class Square extends Point {
    constructor(x: number, y: number, private _width: number) {
        super(x, y);
    }
    get width() {
        return this._width;
    }
    draw() {
        console.log("--------Square-----------");
        super.draw();
        console.log(`width: ${this._width}`)
        console.log("-".repeat(20))

    }
}
class Rectangle extends Square {
    constructor(x: number, y: number, width: number, private _height: number) {
        super(x, y, width);
    }
    draw() {
        console.log("==========Rectangle=================")
        super.draw();
        console.log(`height: ${this._height}`);
        console.log("=".repeat(20))
    }
}
const shapes: Shape[] = [
    new Line(3, 4, new Point(10, 10)),
    new Square(2, 5, 10),
    new Line(20, 30, new Point(3, 4)),
    new Rectangle(10, 15, 20, 5)
]
shapes[0]
const a = shapes.splice(3, 1)[0];
//console.log(a)

/************************************************************HW #33 */
class Canvas implements Shape {
    private _shapes: Shape[] = []
    draw(): void {
        this._shapes.forEach(shape => shape.draw());
        //TODO write method draw for drawing all shapes in the canvas
    }
    addShape(shape: Shape): number {
        //TODO write method adding the given shape inside _shapes
        //returns an index of added shape 
        return this._shapes.push(shape) - 1;
    }
    removeShape(index: number): Shape {
        //TODO write method removing a shape at the given index
        //returns reference to the removed shape
        return this._shapes.splice(index, 1)[0];
    }
    sort(): void {
        //TODO write method sorting the shapes in the following order
        //ascending order of the property x
        //in the case of equaled x values - descending order of the property y
        this._shapes.sort((shapeA, shapeB) => shapeA[Object.keys(shapeA)[0]] - shapeB[Object.keys(shapeB)[0]] ||
            shapeB[Object.keys(shapeB)[1]] - shapeA[Object.keys(shapeA)[1]]);
        return;

    }
    removeIf(predicate: (shape: Shape) => boolean) {
        //TODO write method removing all the shapes matchin the given predicate function
        //TODO write function for testing the method removeIf with the following predicate:
        //remove all lines having the property x of second point greater than the property x of the first point
    }

}
const s1 = new Line(2, 4, new Point(10, 10));
const s2 = new Square(2, 5, 10);
const s3 = new Line(20, 30, new Point(3, 4));
const s4 = new Rectangle(10, 15, 20, 5);


const test = new Canvas();

console.log(test.addShape(s1));
console.log(test.addShape(s2));
console.log(test.addShape(s3));
console.log(test.addShape(s4));
//test.sort()
test.draw()
test.sort();
test.draw()
// console.log(test.removeShape(2))
// console.log(test.removeShape(2))
// console.log(test)