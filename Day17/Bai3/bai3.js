//  Bài 3 // Cho trước số nguyên n. Tính giá trị biểu thức sau

// S= 1*2 + 2*3 + 3*4 + ... + n*(n+1)
n = 5;
S = S(n);
function S(n) {
  var total = 0;
  for (var i = 1; i <= n; i++) {
    total += i * (i + 1);
  }
  return total;
}

console.log(S);
