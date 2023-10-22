// bài 1

var numbers = [10, 5, 7, 22, 3, 15];

var maxNumber = numbers[0];
var minNumber = numbers[0];
var maxIndex = 0;
var minIndex = 0;

for (var i = 1; i < numbers.length; i++) {
  if (numbers[i] > maxNumber) {
    maxNumber = numbers[i];
    maxIndex = i;
  }

  if (numbers[i] < minNumber) {
    minNumber = numbers[i];
    minIndex = i;
  }
}

console.log("Số lớn nhất là:" + maxNumber + " ở vị trí: " + maxIndex);
console.log("Số nhỏ nhất là:", minNumber + " ở vị trí: " + minIndex);

// bài 2
var numbers = [2, 3, 5, 7, 11, 13];
var sumOfPrimes = 0;
var countOfPrimes = 0;

function isPrime(number) {
  if (number <= 1) {
    return false;
  }
  for (var i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}

for (var i = 0; i < numbers.length; i++) {
  if (isPrime(numbers[i])) {
    sumOfPrimes += numbers[i];
    countOfPrimes++;
  }
}

if (countOfPrimes === 0) {
  console.log("Không có số nguyên tố");
} else {
  var average = sumOfPrimes / countOfPrimes;
  console.log("Trung bình các số nguyên tố là:" + average);
}

// bài 3
var array = [2, 5, 7, 8, 2, 5, 8, 9, 15];

var newArray = [];

for (var i = 0; i < array.length; i++) {
  if (newArray.indexOf(array[i]) === -1) {
    newArray.push(array[i]);
  }
}

console.log(newArray);
