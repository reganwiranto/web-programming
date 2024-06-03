document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-bar');

    // Load CSV data and display restaurants
    fetch('restaurants.csv')
        .then(response => response.text())
        .then(data => {
            const restaurants = parseCSV(data);
            displayRestaurants(restaurants);

            // Search functionality
            searchButton.addEventListener('click', () => {
                const query = searchBar.value.toLowerCase();
                const filteredRestaurants = restaurants.filter(restaurant =>
                    restaurant.title.toLowerCase().includes(query) ||
                    restaurant.category.toLowerCase().includes(query) ||
                    restaurant.street.toLowerCase().includes(query) ||
                    restaurant.city.toLowerCase().includes(query) ||
                    restaurant.state.toLowerCase().includes(query)
                );
                displayRestaurants(filteredRestaurants);
            });
        });
});

// Parse CSV data into a list of restaurant objects
function parseCSV(data) {
    const lines = data.split('\n');
    const headers = lines[0].split(','); // Get CSV headers
    const restaurants = [];

    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue; // Skip empty lines
        const details = lines[i].split(',');
        const restaurant = {
            title: details[0].trim(),
            totalScore: details[1].trim(),
            reviewsCount: details[2].trim(),
            street: details[3].trim(),
            city: details[4].trim(),
            state: details[5].trim(),
            countryCode: details[6].trim(),
            website: details[7].trim(),
            phone: details[8].trim(),
            category: details[9].trim(),
            url: details[10].trim()
        };

        restaurants.push(restaurant);
    }

    return restaurants;
}

// Display restaurants on the webpage
function displayRestaurants(restaurants) {
    const restaurantList = document.getElementById('restaurant-list');
    restaurantList.innerHTML = ''; // Clear previous results

    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.classList.add('restaurant-card');

        card.innerHTML = `
            <h2>${restaurant.title}</h2>
            <p class="score">Rating: ${restaurant.totalScore} (${restaurant.reviewsCount} reviews)</p>
            <p>Category: ${restaurant.category}</p>
            <p>Address: ${restaurant.street}, ${restaurant.city}, ${restaurant.state}, ${restaurant.countryCode}</p>
            <p>Phone: ${restaurant.phone}</p>
            ${restaurant.website ? `<a href="${restaurant.website}" target="_blank">Visit Website</a>` : ''}
            <a href="${restaurant.url}" target="_blank">View on Google Maps</a>
        `;

        restaurantList.appendChild(card);
    });
}
