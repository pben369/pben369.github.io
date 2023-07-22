let imageIndex = 0;
let journalEntries = [];

// Function to display current date and time
function displayDateTime() {
  const now = new Date();
  const dateTimeElement = document.getElementById('date-time');
  dateTimeElement.innerHTML = now.toLocaleString();
}

// Function to preview the selected image
function previewImage(event) {
  const input = event.target;
  const reader = new FileReader();
  reader.onload = function () {
      const preview = document.getElementById('chart-preview');
      const image = document.createElement('img');
      const imageUrl = reader.result;
      image.src = imageUrl;
      image.className = 'chart-image';
      image.addEventListener('click', function () {
          openImageInNewTab(imageUrl);
      });
      preview.appendChild(image);
      imageIndex++;
  };
  reader.readAsDataURL(input.files[0]);
}

// Function to add an image
function addImage() {
  const fileInput = document.getElementById('chart-file');
  fileInput.click();
}

// Function to open the image in a new tab
function openImageInNewTab(imageUrl) {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.target = '_blank';
  link.click();
}

// Function to save trade journal entry
function saveJournalEntry() {
  const journalEntry = {
    date: new Date().toISOString(),
    symbol: document.getElementById('symbol').value,
    strikePrice: document.querySelector('[name="strike-price"]').value,
    option: document.getElementById('option').value,
    qty: document.querySelector('[name="qty"]').value,
    entryPrice: document.querySelector('[name="entry"]').value,
    exitPrice: document.querySelector('[name="exit"]').value,
    stopLoss: document.querySelector('[name="stoploss"]').value,
    points: document.querySelector('[name="points"]').value,
    learnings: document.querySelector('[name="learnings"]').value,
    chartImage: getChartImage()
  };

  // Store the journal entry in the array
  journalEntries.push(journalEntry);

  // Clear the form fields after saving the entry
  clearFormFields();

  // Update the menu with links to each journal entry page
  updateMenu();

  submitToGoogleSheet();
}

// Function to get the chart image (if available)
function getChartImage() {
  const chartPreview = document.getElementById('chart-preview');
  const image = chartPreview.querySelector('img');
  return image ? image.src : null;
}

// Function to clear form fields after saving an entry
function clearFormFields() {
  const formElements = document.querySelectorAll('input[type="text"], textarea');
  formElements.forEach((element) => (element.value = ''));
  const chartPreview = document.getElementById('chart-preview');
  chartPreview.innerHTML = '';
}

// Function to update the menu with links to each journal entry page
function updateMenu() {
  const menu = document.getElementById('menu');
  menu.innerHTML = ''; // Clear existing menu links

  // Create a link for each journal entry
  journalEntries.forEach((entry, index) => {
    const link = document.createElement('a');
    link.textContent = formatDate(entry.date); // Format the date for the link text
    link.href = `#${index}`; // Use an anchor link with the entry index as the hash
    link.addEventListener('click', function() {
      displayJournalEntry(index); // Display the selected journal entry
    });
    const listItem = document.createElement('li');
    listItem.appendChild(link);
    menu.appendChild(listItem);
  });
}

// Function to display a journal entry based on its index
function displayJournalEntry(index) {
  const entry = journalEntries[index];
  // For demonstration purposes, let's display the entry details in an alert.
  const entryDetails = JSON.stringify(entry, null, 2);
  alert("Trade Journal Entry:\n\n" + entryDetails);
  // You can replace the alert with logic to display the entry details on a separate webpage.
}

// Function to format the date for display in the menu
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toDateString();
}

// Function to create a new HTML page for each journal entry
function createJournalEntryPage(entryIndex) {
  const entry = journalEntries[entryIndex];
  const formattedDate = formatDate(entry.date);
  const pageContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Trade Journal Entry - ${formattedDate}</title>
    </head>
    <body>
      <h1>Trade Journal Entry - ${formattedDate}</h1>
      <pre>${JSON.stringify(entry, null, 2)}</pre>
    </body>
    </html>
  `;

  // Create a new Blob containing the page content
  const blob = new Blob([pageContent], { type: 'text/html' });

  // Generate a URL for the Blob (virtual URL representing the HTML file)
  const pageUrl = URL.createObjectURL(blob);

  // Create a link to the new page in the menu
  const link = document.createElement('a');
  link.textContent = formattedDate;
  link.href = pageUrl;
  const listItem = document.createElement('li');
  listItem.appendChild(link);

  // Add the link to the menu
  const menu = document.getElementById('menu');
  menu.appendChild(listItem);
}

// Function to update the menu with links to each journal entry page
function updateMenu() {
  const menu = document.getElementById('menu');
  menu.innerHTML = ''; // Clear existing menu links

  // Create a link for each journal entry
  journalEntries.forEach((entry, index) => {
    createJournalEntryPage(index); // Create a new page for each entry
  });
}

// Function to submit the form data and image to the Google Sheet
function submitToGoogleSheet() {
  // Get the form data
  const formObject = {
    symbol: document.getElementById('symbol').value,
    strikePrice: document.getElementById('strike-price').value,
    option: document.getElementById('option').value,
    qty: document.getElementById('qty').value,
    entry: document.getElementById('entry').value,
    exit: document.getElementById('exit').value,
    stoploss: document.getElementById('stoploss').value,
    points: document.getElementById('points').value,
    learnings: document.getElementById('learnings').value,
    note: document.getElementById('note').value,
    image: null, // We'll set this value later
  };

  // Get the selected image
  const imageInput = document.getElementById('chart-file');
  const imageFile = imageInput.files[0];

  if (imageFile) {
    // Read the image as a Base64 string
    const reader = new FileReader();
    reader.onload = function () {
      formObject.image = reader.result; // Store the Base64 string in the form object
      submitDataToGoogleScript(formObject);
    };
    reader.readAsDataURL(imageFile);
  } else {
    // If no image is selected, submit the form data without the image
    submitDataToGoogleScript(formObject);
  }
  console.log(formObject);
}

// Function to submit the form data to the Google Apps Script web app
function submitDataToGoogleScript(formObject) {
  // Submit the form data to the Google Apps Script web app
  const scriptURL = 'https://script.google.com/macros/s/AKfycbxWI0u8BlFLKZkrqd2RHO2YSMgAhZItSBTwNfzMkucMRIamVy0LD7VDbrPbGvXss5XO/exec'; // Replace with your Apps Script web app URL
  const formData = new FormData();
  formData.append('data', JSON.stringify(formObject));
  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => {
      // Handle the response, if needed
    })
    .catch(error => {
      // Handle errors, if any
    });
  
  
  // Optionally, you can clear the form fields after submitting
  document.getElementById('symbol').value = '';
  document.getElementById('strike-price').value = '';
  document.getElementById('option').value = '';
  document.getElementById('qty').value = '';
  document.getElementById('entry').value = '';
  document.getElementById('exit').value = '';
  document.getElementById('stoploss').value = '';
  document.getElementById('points').value = '';
  document.getElementById('learnings').value = '';
  document.getElementById('note').value = '';
  document.getElementById('chart-file').value = ''; // Clear the file input field
}


// Call the functions when the page loads
window.onload = function() {
  displayDateTime();
  updateMenu(); // Update the menu with any existing journal entries
  
};