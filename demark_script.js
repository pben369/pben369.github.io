function calculateRange() {
  var open = parseFloat(document.getElementById("openInput").value);
  var high = parseFloat(document.getElementById("highInput").value);
  var low = parseFloat(document.getElementById("lowInput").value);
  

  var priceRange = high - low;

  var a = priceRange * 0.382;
  var b = priceRange * 0.5;
  var c = priceRange * 0.618;
  
  var h1 = open + a;
  var h2 = open + b;
  var h3 = open + c;
  
  var l1 = open - a;
  var l2 = open - b;
  var l3 = open - c;
  
  document.getElementById("highRange3").textContent = h3.toFixed(2);
  document.getElementById("highRange2").textContent = h2.toFixed(2);
  document.getElementById("highRange1").textContent = h1.toFixed(2);
  document.getElementById("lowRange1").textContent = l1.toFixed(2);
  document.getElementById("lowRange2").textContent = l2.toFixed(2);
  document.getElementById("lowRange3").textContent = l3.toFixed(2);

}
