function calculateDealingRangeLevels(sessionOpenPo3InputId, strikePriceInputId, outputDivId) {
  var po3num = 0;
  var sessionOpenpo3 = parseFloat(document.getElementById(sessionOpenPo3InputId).value);

  switch (sessionOpenPo3InputId) {
    case 'bankniftyOpenPriceInput':
      po3num = 243;
      break;
    case 'niftyOpenPriceInput':
      po3num = 81;
      break;
    case 'bnCallOpenPriceInput':
    case 'bnPutOpenPriceInput':
    case 'n50PutOpenPriceInput':
    case 'n50CallOpenPriceInput':
      po3num = 81;
      break;
    // Add more cases for additional columns if needed
  }

  var drlow = Math.floor(sessionOpenpo3 / po3num) * po3num;
  var drhigh = drlow + po3num;

  var rangeLevelsOutput = document.getElementById(outputDivId);
  rangeLevelsOutput.innerHTML =
	"<p><span class='high-value'>" + (drhigh + (po3num * 2) ) + "</span> (High)</p>" +
	"<p><span class='high-value'>" + (drhigh + po3num) + "</span> (High)</p>" +
    "<p><span class='high-value'>" + drhigh + "</span> (High)</p>" +
    "<p><span class='low-value'>" + drlow + "</span> (Low)</p>" + 
	"<p><span class='low-value'>" + (drlow - po3num) + "</span> (Low)</p>" +
	"<p><span class='low-value'>" + (drlow - (po3num * 2)) + "</span> (Low)</p>" ;

  
}
