function reverse(str) {
  return str.split("").reverse().join("");
}

console.log(reverse("Hello, World!"));

var find132pattern = function (nums) {
  let result = [];

  function permutations(result, nums, currSequence = []) {
    if (currSequence.length < 3) {
      for (let i = 0; i < nums.length; i++) {
        if (currSequence.length === 0) {
          const newNums = [...nums];
          permutations(result, newNums.slice(i + 1), [nums[i]]);
        } else if (currSequence.length === 1) {
          if (currSequence[0] < nums[i]) {
            const newNums = [...nums];
            permutations(result, newNums.slice(i + 1), [
              ...currSequence,
              nums[i],
            ]);
          }
        } else {
          if (currSequence[0] < nums[i] && nums[i] < currSequence[1]) {
            result.push(currSequence[0], currSequence[1], nums[i]);
          }
        }
      }
    }
  }

  permutations(result, nums);
  return result.length > 0;
};

console.log("find132pattern: ", find132pattern([3, 1, 4, 2]));

class Tree {
  constructor(head, children = null) {
    this.head = head;
    head.children = children;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.next;
  }
}

class PriorityQueue {
  constructor() {
    this.first;
  }

  insert(val) {
    const newNode = new Node(val);
    if (!this.first || newNode.val < this.first.val) {
      const first = this.first;
      this.first = newNode;
      newNode.next = first;
    } else {
      let pointer = this.first;
      while (pointer && pointer.next && newNode.val > pointer.next.val) {
        pointer = pointer.next;
      }
      const next = pointer.next;
      pointer.next = newNode;
      newNode.next = next;
    }
    return newNode;
  }

  remove() {
    const first = this.first;
    if (this.first) {
      this.first = this.first.next;
    }
    return first;
  }
}

let priorityQueue = new PriorityQueue();
priorityQueue.insert(2);
priorityQueue.insert(3);
priorityQueue.insert(1);
priorityQueue.insert(2);
priorityQueue.remove();
console.log(priorityQueue);

class PriorityHeap {
  constructor() {
    this.heap = [null];
  }

  insert(value, priority) {
    const newNode = new Node(value, priority);
    this.heap.push(newNode);
    let currentNodeIdx = this.heap.length - 1;
    let currentNodeParentIdx = Math.floor(currentNodeIdx / 2);
    while (
      this.heap[currentNodeParentIdx] &&
      newNode.priority > this.heap[currentNodeParentIdx].priority
    ) {
      const parent = this.heap[currentNodeParentIdx];
      this.heap[currentNodeParentIdx] = newNode;
      this.heap[currentNodeIdx] = parent;
      currentNodeIdx = currentNodeParentIdx;
      currentNodeParentIdx = Math.floor(currentNodeIdx / 2);
    }
  }

  remove() {
    // heap only has null and root
    if (this.heap.length < 3) {
      const toReturn = this.heap.pop();
      this.heap[0] = null;
      return toReturn;
    }
    const toRemove = this.heap[1]; // index 1 since index 0 is always null
    this.heap[1] = this.heap.pop();
    let currentIdx = 1;
    let [left, right] = [2 * currentIdx, 2 * currentIdx + 1]; // get left and right child

    // get index of child with greater priority
    let currentChildIdx =
      this.heap[right] && this.heap[right].priority >= this.heap[left].priority
        ? right
        : left;

    // swap with children while children have greater priority
    while (
      this.heap[currentChildIdx] &&
      this.heap[currentIdx].priority <= this.heap[currentChildIdx].priority
    ) {
      let currentNode = this.heap[currentIdx]; // current "root"
      let currentChildNode = this.heap[currentChildIdx];
      this.heap[currentChildIdx] = currentNode;
      this.heap[currentIdx] = currentChildNode;
    }
    return toRemove;
  }
}

class Car {
  constructor(startingSpeed) {
    this.speed = startingSpeed;
  }
  accerlerate(increase) {
    this.speed += increase;
  }

  deccelerate(decrease) {
    this.speed -= decrease;
  }
}

const car1 = new Car(55);
const car2 = new Car(45);

car1.accerlerate(15);
car2.deccelerate(10);
console.log("Car 1 speed: ", car1.speed, " Car 2 speed: ", car2.speed);

car1.deccelerate(30);
car2.accerlerate(25);

console.log("Car 1 speed: ", car1.speed, " Car 2 speed: ", car2.speed);

function carCreator(speed) {
  this.speed = speed;
}

carCreator.prototype.accerlerate = function (increase) {
  this.speed += increase;
};

carCreator.prototype.deccelerate = function (decrease) {
  this.speed -= decrease;
};

const car3 = new carCreator(55);
const car4 = new carCreator(45);

car3.accerlerate(15);
car4.deccelerate(10);
console.log("Car 3 speed: ", car3.speed, " Car 4 speed: ", car4.speed);

car3.deccelerate(30);
car4.accerlerate(25);

console.log("Car 3 speed: ", car3.speed, " Car 4 speed: ", car4.speed);

class AmazonCustomer {
  constructor(friends = []) {
    this.friends = friends;
    this.recommendations = {};
  }

  getRecomendations() {
    const friends = this.friends;

    function getOrders(person) {
      return person.orders;
    }

    for (let friend of friends) {
      const orders = {};
      for (let order of getOrders(friend)) {
        if (!orders[order]) {
          if (this.recommendations[order]) {
            this.recommendations[order]++;
          } else {
            this.recommendations[order] = 1;
          }
          orders[order] = 1;
        }
      }
    }

    console.log(this.recommendations);
    return Object.entries(this.recommendations)
      .sort((a, b) => b[1] - a[1])
      .map((order) => order[0]);
  }
}

const amazonCustomer1 = new AmazonCustomer([
  { id: 1, orders: [1, 2, 3] },
  { id: 2, orders: [4, 5, 6] },
  { id: 3, orders: [1, 2, 6] },
  { id: 4, orders: [7, 4, 3] },
  { id: 5, orders: [4, 2, 4] },
  { id: 6, orders: [4, 7, 3] },
]);

console.log(amazonCustomer1.getRecomendations());

function debounce(callback, wait = 0) {
  let timeout;
  return () => {
    const later = () => {
      callback();
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function a() {
  console.log("a fired");
}

let b = debounce(a, 1000);
b();
b();
b(); // will only print once

class LinkNode {
  constructor(val) {
    this.val = val;
    this.next;
  }
}

class LinkedList {
  constructor() {
    this.head;
  }

  add(node) {
    if (!this.head) {
      this.head = node;
    } else {
      let pointer = this.head;
      while (pointer.next) {
        pointer = pointer.next;
      }
      pointer.next = node;
    }
  }

  has(val) {
    let pointer = this.head;
    while (pointer) {
      if (pointer.val === val) {
        return true;
      }
      pointer = pointer.next;
    }
    return false;
  }
}

const linkedList = new LinkedList();

linkedList.add(new Node(4));
linkedList.add(new Node(5));
linkedList.add(new Node(1));
linkedList.add(new Node(2));

console.log(linkedList.has(1)); // true
console.log(linkedList.has(4)); // true
console.log(linkedList.has(6)); // false

// for (let i = 0; i < 4; i++) {
//   setTimeout((i) => console.log(i), 0, i);
// }

function Dog(name) {
  this.name = name;
}

Dog.prototype.speak = function () {
  console.log(this.name);
};

const stark = new Dog("Stark");
stark.speak();

function removeChar(str, i) {
  str = str.slice(0, i) + str.slice(i + 1);
  return str;
}

function removeChar(str, val) {
  let arr = str.split("");
  return arr.filter((char) => char !== val).join("");
}
console.log("Sliced: ", "Hello".slice(2) === "llo");
console.log("Sliced: ", "Hello".slice(2, 5));

console.log(removeChar("Hello", 4));
console.log(removeChar("Hello", "l"));

function removeElementIndex(arr, i) {
  // return arr.filter((elem, index) => index !== i);
  const arr2 = [2, 3];
  arr.splice(i, 1, ...arr2);
  return arr;
}

function removeElementValue(arr, val) {
  return arr.filter((elem) => elem !== val);
}

console.log(
  "removeElementIndex 1 from [1,2,3,4,5] :",
  removeElementIndex([1, 2, 3, 4, 5], 1)
);

console.log(
  "removeElementValue 2 from [1,2,3,4,5] :",
  removeElementValue([1, 2, 3, 4, 5], 2)
);

function Animal(breed) {
  this.breed = breed;
  this.speak2 = () => {
    console.log(this.breed);
  };
}

Animal.prototype.speak = function () {
  console.log(this.breed);
};

const cat = new Animal("cat");
cat.speak();
cat.speak2();

function Animal2() {
  return {
    breed: "cat",
    speak: function () {
      console.log("Breed: ", this.breed);
    },
  };
}

const pet = Animal2();
console.log("breed: ", pet.breed);
pet.speak();

// Implement Function.prototype.bind()

const foo = function () {
  console.log(this.bar);
};

let baz = foo.bind({ bar: "hello bind" });

baz(); // Hello;

Function.prototype.bind = function (context) {
  const fn = this;

  return () => {
    fn.call(context);
  };
};

function removeDuplicates(str) {
  const arr = str.split(" ");

  const set = new Set(arr);

  // can also use Array.from
  const newString = [...set].join(" ");

  // const newArr = [];
  // const wordMap = {};

  // for (let word of arr) {
  //   if (!wordMap[word]) {
  //     wordMap[word] = true;
  //     newArr.push(word);
  //   }
  // }
  // const newString = newArr.join(" ");
  return newString;
}

console.log(
  "removeDuplicated: ",
  removeDuplicates("This is is a test a test string")
);

function flatten(arr) {
  let newArr = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      newArr = newArr.concat(flatten(item));
    } else {
      newArr.push(item);
    }
  }

  return newArr;
}

const exampleArray = [1, 2, [3, 4, [5, 6, 7], 8], 9, 10];
console.log("flatten: ", flatten(exampleArray));

function debounce2(fn, timeoutTime) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn, timeoutTime);
  };
}

function debounceTest() {
  console.log("HELLLLLO");
}

const debounceConst = debounce2(debounceTest, 1000);
debounceConst();
debounceConst();
debounceConst();

function reversePath(element, root) {
  const path = [];

  let pointer = element;
  while (pointer.parent) {
    path.push(pointer.parent.children.indexOf(pointer));
    pointer = pointer.parent;
  }

  pointer = root;
  while (path.length) {
    pointer = pointer.children[path.pop()];
  }
  return pointer;
}

// request animation frame passes timestamp
function moveElement(duration, distance, element) {
  const start = performance.now();

  function move(currentTime) {
    const elapsed = currentTime - start;
    const progress = elapsed / duration;
    const amountToMove = progress * distance;

    element.style.transform = `translateX(${Math.min(amountToMove)})px`;
    if (amountToMove < distance) {
      requestAnimationFrame(move);
    }
  }

  requestAnimationFrame(move);
}

// Create a sleep function that takes one parameter (time) and
// will wait "time" ms

function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

async function run() {
  await sleep(500);
  console.log("hello");
  await sleep(500);
  console.log("world");
}

run();

// Create a function to turn any function into a "promisfied" function.
// Any function to be promisified will always have a callback as the last argument.
// The callback will always have this signature:
//   function(result){}

const exampleFn = function (x, y, callback) {
  console.log(x + y);
  return callback;
};
const promisedFn = promisify(exampleFn);
// promisedFn().then(...).then(...)
+function promisify(fn) {
  return new Promise((resolve) => {
    let callback = fn();
    resolve();
    return promisify(callback);
  });
};
