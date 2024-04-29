// Function to send message to bot and display messages
function sendMessageToBot(userInput) {
    fetch('https://us.ipaas.teamdynamix.com/tdapp/app/flow/api/v1/start/byui/snowraptor/snowraptor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput })
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

// Function to display messages in the chat
function displayMessage(messageText, sender) {
    const messageList = document.getElementById('messages');
    const newMessage = document.createElement('li');
    newMessage.textContent = messageText;
    newMessage.className = sender;
    messageList.appendChild(newMessage);
    messageList.scrollTop = messageList.scrollHeight; // Auto-scroll to new message
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
