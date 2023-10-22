//  // bài 1
var array1 = [1, 4, 3, 2];
var array2 = [5, 2, 6, 7, 1];

var result = array1.reduce(function (prev, current) {
  if (array2.includes(current)) {
    prev.push(current);
  }

  return prev;
}, []);
console.log(result);

//bài 2
var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];

var result = (function () {
  if (Array.isArray(arr)) {
    return arr.flat(Infinity);
  } else {
    return "arr không phải mảng";
  }
})();

console.log("result", result);

// bài 3
var arr = [
  ["a", 1, true],
  ["b", 2, false],
];
var result = (function (arr) {
  if (Array.isArray(arr)) {
    return arr.flat(Infinity).reduce((acc, item) => {
      const type = typeof item;
      if (!acc[type]) acc[type] = [];
      acc[type].push(item);
      return acc;
    }, {});
  }
})(arr);
console.log(result);
