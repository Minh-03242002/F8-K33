// # Bài 5: Sắp xếp 3 số
// Input:

// Cho trước 3 số a, b, c

// Output:

// Thực hiện đổi chỗ 3 số a, b, c sao cho 3 số có thứ tự tăng dần

var number = [3, 10, 5];
number.sort(function (a, b) {
  return a - b;
});
console.log(` thứ tự sau khi sắp xếp: ` + number);
// return [a, b, c];
