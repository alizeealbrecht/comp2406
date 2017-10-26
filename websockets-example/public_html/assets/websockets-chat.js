(function(document, io) {
    const chatBox = document.getElementById('chat-box');
    const messageForm = document.getElementById('message-form');
    const messageInput = messageForm.querySelector('input');
    const socket = io();
    const userNumber = Math.floor(Math.random() * 100000);

    socket.emit('user-logged-in', userNumber);

    function addMessageToChatBox(message) {
        const messageElement = document.createElement('p');
        messageElement.innerText = message;

        chatBox.appendChild(messageElement);
    }

    messageForm.addEventListener('submit', event => {
        event.preventDefault();

        socket.emit('chat-message-sent', messageInput.value);
        messageInput.value = '';
    });

    socket.on('receive-chat-message', addMessageToChatBox);
    socket.on('receive-all-messages', messages => messages.forEach(addMessageToChatBox));

    document.getElementById('user-name').innerText = 'User #' + userNumber;
})(window.document, window.io);