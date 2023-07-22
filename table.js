function generateMultiplicationTables(numbers) {
  var tableContainer = document.getElementById("table-container-mul");
  
  var table = document.createElement("table");
  var headerRow = document.createElement("tr");
  
  // Add headers for each number
  for (var i = 0; i < numbers.length; i++) {
    var number = numbers[i];
    var headerCell = document.createElement("th");
    headerCell.textContent = number;
    headerRow.appendChild(headerCell);
  }
  
  table.appendChild(headerRow);

  // Generate rows for the multiples
  for (var j = 1; j <= 10; j++) {
    var row = document.createElement("tr");
    
    // Generate cells for each number's multiple
    for (var i = 0; i < numbers.length; i++) {
      var number = numbers[i];
      var product = number * j;
      var cell = document.createElement("td");
      cell.textContent = product;
      row.appendChild(cell);
    }
    
    table.appendChild(row);
  }

  tableContainer.appendChild(table);
}

var numbers = [9, 27, 81, 243];
generateMultiplicationTables(numbers);
