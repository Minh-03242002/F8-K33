// # Bài 1: Tính tiền taxi
// Tính tiền cước taxi dựa vào các điều kiện sau
// Số km ≤ 1 giá 15000đ
// 1 < số km ≤ 5 giá 13500đ
// Số km > 5 giá 11000đ
// Nếu số km > 120 km sẽ được giảm 10% trên tổng số tiền

var km = "121";
var total;
var value;

if (km <= 1) {
  total = km * value;
} else if (km > 1 && km <= 5) {
  total = km * value;
} else {
  value = 11000;
  total = km * value;
  if (km > 120) {
    total -= total * 0.1;
  }
}
console.log(` tiền cần thành toán là :` + total);
