
// DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Get the search form and its elements
    const searchForm = document.querySelector('.search-form');
    const categorySelect = document.getElementById('category');
    const locationInput = document.getElementById('location');
    const searchButton = document.querySelector('.search-btn');
  
    // Add event listener to the search button (to validate the form before submission)
    searchButton.addEventListener('click', function (event) {
      event.preventDefault(); 
  
      // Validate the form inputs
      const category = categorySelect.value;
      const location = locationInput.value.trim();
  
      if (category === '' || location === '') {
        alert('Please select a category and enter a location.');
      } else {
        // If validation passes, submit the form
        searchForm.submit();
      }
    });
  
    // Example of dynamic location suggestion based on user input
    locationInput.addEventListener('input', function () {
      const locationValue = locationInput.value.trim();
      
      if (locationValue.length > 3) {
        // Simulate dynamic suggestions (you could replace this with actual API calls)
        console.log(`Searching for suppliers in "${locationValue}"...`);
        // Here, you can add code to show dynamic location suggestions or fetch data from an API.
      }
    });
  
    // Optionally, if you want to handle dynamic changes based on category
    categorySelect.addEventListener('change', function () {
      const selectedCategory = categorySelect.value;
      
      // Example of dynamic category handling
      console.log(`Selected category: ${selectedCategory}`);
      
    });
  });
  