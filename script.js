// Function to send message to bot and display messages
function sendMessageToBot(userInput) {
    fetch('https://us.ipaas.teamdynamix.com/tdapp/app/flow/api/v1/start/81f6c450-86cb-47ef-a1a0-9751f9584663/ba13ab39-c101-432b-9a2b-506273683345', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: userInput // Ensure userInput is a string
                }
            ],
            temperature: 1,
            top_p: 1,
            n: 1,
            max_tokens: 4000
        })
    })
    .then(response => response.json())
    .then(data => {
        displayMessage(data.reply, 'bot'); // Display the response in the chat
    })
    .catch(error => {
        console.error('Error:', error);
        displayMessage("Failed to get response from bot", 'error'); // Display error message in chat
    });
}


// Single event listener for the send button
document.getElementById('send-button').addEventListener('click', function(event) {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput) {
        displayMessage(userInput, 'user'); // Display user's message
        sendMessageToBot(userInput); // Send message to iPaaS
        document.getElementById('user-input').value = ''; // Clear input field
    } else {
        console.log("Please type a message before sending.");
    }
});

// Event listener for the Enter key in the input field
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('send-button').click();
    }
});

// Event listener for the clear chat button
document.getElementById('clear-chat').addEventListener('click', function() {
    const messages = document.querySelectorAll('#messages li');
    messages.forEach(function(message) {
        message.style.animationName = 'fadeOutUp';
    });
    setTimeout(function() {
        document.getElementById('messages').innerHTML = '';
    }, 500); // Wait for animation to complete before clearing
});
