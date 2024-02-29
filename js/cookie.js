// Function to retrieve user data based on the username
function getUserData(username) {
    // Replace 'https://your-api-endpoint/user' with the actual endpoint of your API
    return fetch(`https://your-api-endpoint/user?username=${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle the user data received from the API
        console.log('User Data:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Retrieve the username cookie
const username = getCookie('username');

if (username) {
    // The username cookie exists, call the API to get user data
    getUserData(username);
} else {
    // The username cookie is not set
    console.log('Username cookie not found');
}
