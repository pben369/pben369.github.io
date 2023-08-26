function calculateLots() {
    // Get user inputs
    const capital = parseFloat(document.getElementById("capital").value);
    const index = document.getElementById("index").value;
    const strikePrice = parseFloat(document.getElementById("strikePrice").value);

    // Define units per lot for different indices
    const unitsPerLot = {
        Banknifty: 15,
        Nifty50: 50,
        FinNifty: 40,
        MidCpNifty: 75,
        Sensex: 30
    };

    // Calculate cost per lot
    const costPerLot = unitsPerLot[index] * strikePrice;

    // Calculate quantity per lot
    const quantityPerLot = unitsPerLot[index];

    // Calculate number of lots and round it to an integer
    const lots = Math.floor(capital / costPerLot);

    // Calculate total qty
    const qty = unitsPerLot[index] * lots

    // Display results in a table
    let resultMessage;

    if ( lots >=1) {
        resultMessage = `
            <table>
                <tr>
                    <th>Index</th>
                    <th>Quantity per Lot</th>
                    <th>Cost per Lot</th>
                    <th>No. of Lots</th>
                    <th>Qty</th>
                </tr>
                <tr>
                    <td>${index}</td>
                    <td>${quantityPerLot}</td>
                    <td>${costPerLot}</td>
                    <td>${lots}</td>
                    <td>${qty}</td>
                </tr>
            </table>
        `;
    } else {
        const amountShort = costPerLot - capital;
        resultMessage = `
            <table>
                <tr>
                    <th>Index</th>
                    <th>Quantity per Lot</th>
                    <th>Cost per Lot</th>
                    <th>No. of Lots</th>
                    <th>Qty</th>
                </tr>
                <tr>
                    <td>${index}</td>
                    <td>${quantityPerLot}</td>
                    <td>${costPerLot}</td>
                    <td>${lots}</td>
                    <td>You will need additional ₹ ${amountShort.toFixed(2)} to buy atleast 1 lot at this premium.</td>
                </tr>
            </table>
        `;
    }

    document.getElementById("result").innerHTML = resultMessage;
}
