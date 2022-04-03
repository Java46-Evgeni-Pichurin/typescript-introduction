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

/************************************************************HW #33**********************************************************************/
class Canvas implements Shape {
    private _shapes: Shape[] = []
    draw(): void {
        this._shapes.forEach(shape => shape.draw());
    }
    addShape(shape: Shape): number {
        return this._shapes.push(shape) - 1;
    }
    removeShape(index: number): Shape {
        return this._shapes.splice(index, 1)[0];
    }
    sort(): void {
        this._shapes.sort((shapeA, shapeB) => shapeA[Object.keys(shapeA)[0]] - shapeB[Object.keys(shapeB)[0]] ||
            shapeB[Object.keys(shapeB)[1]] - shapeA[Object.keys(shapeA)[1]]);
        return;
    }
    removeIf(predicate: (shape: Shape) => boolean) {
        return this._shapes.filter(shape => !predicate(shape));
    }
}

function testRemoveIf(shape: Shape): boolean {
    return shape[Object.keys(shape)[0]] < Object.values(shape[Object.keys(shape)[2]])[0];
}

/*************************************************************Test***********************************************************************/

const s1 = new Line(2, 4, new Point(10, 10));
const s2 = new Square(2, 5, 10);
const s3 = new Line(20, 30, new Point(3, 4));
const s4 = new Rectangle(10, 15, 20, 5);
const s5 = new Line(17, 30, new Point(17, 4));
const s6 = new Line(2, 30, new Point(13, 4));

const test = new Canvas();

console.log(`\nTesting method addShape:`);
console.log(`Adding shape s1... Index of the shape is ${test.addShape(s1)}`);
console.log(`Adding shape s2... Index of the shape is ${test.addShape(s2)}`);
console.log(`Adding shape s3... Index of the shape is ${test.addShape(s3)}`);
console.log(`Adding shape s4... Index of the shape is ${test.addShape(s4)}`);
console.log(`Adding shape s5... Index of the shape is ${test.addShape(s5)}`);
console.log(`Adding shape s6... Index of the shape is ${test.addShape(s6)}`);


console.log(`\nTesting method removeShape:`);
console.log(`Removing shape s4... Removed shape is `);
test.removeShape(3).draw();

console.log(`\nTesting method sort:`);
test.sort();
console.log(`Sorted array of shapes: `);
console.log(Object.values(test)[0])

console.log(`\nTesting method removeIf:`);
console.log(`Removing all Lines having the property x of second point greater than the property x of the first point`);
console.log(test.removeIf(testRemoveIf));