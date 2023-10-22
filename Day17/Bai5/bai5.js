function triangle(n) {
  var number = 1;
  for (var i = 1; i <= n; i++) {
    var row = "";
    for (var j = 1; j <= i; j++) {
      row += number + " ";
      number++;
    }
    console.log(row);
  }
}

var rows = 5;
triangle(rows);
