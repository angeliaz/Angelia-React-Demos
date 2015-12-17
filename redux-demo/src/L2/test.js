for(let i = i; i < 5; i++) {
    console.log(i + '-');
}

function f1() {
    var a = 1;
    console.log(b);
    var b = 2;
}
f1();

function f() { console.log('I am outside!'); }
if(true) {
   // 重复声明一次函数f
   function f() { console.log('I am inside!'); }
}
// ES5中是I am inside!
f();

class Point {
    constructor(x, y) {
        this.x = 4;
        this.y = 0;
    }

    static distance() {

        const dx = this.x;
        const dy = this.y;
console.log(dx, dy)
        return Math.sqrt(dx*dx + dy*dy);
    }
}
console.log(Point.distance());


class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(this.name + ' wants to eat.');
  }

  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  speak() {
    super.eat();
    console.log(this.name + ' barks.');
  }
}

var dog = new Dog('coco');
dog.speak();



var Test = {};

// exports['default'] = Test;
module.exports = Test; //exports['default'];