function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

const socket = io();
        let currentUser = getCookie('prattleuser'); // Get the logged-in user from backend
        socket.emit("register", currentUser); // Register this user to Socket.IO

        let selectedUser = "martha2005"; // The user you are chatting with

        // Send message
        const sendMessagebtn = document.querySelector('#sendChatInput');
          sendMessagebtn.addEventListener('submit' , (e) => {
            e.preventDefault();

            let message = document.querySelector('#inputMessage').value;
            if (selectedUser && message.length > 0) {
                socket.emit("privateMessage", {
                    sender: currentUser,
                    receiver: selectedUser,
                    message: message
                });
                console.log("sender: " + currentUser + " receiver: " + selectedUser);

                // Display sent message in chatbox
                document.querySelector('#chatBox').innerHTML += `<div id="sendMessage" class="flex justify-end">
                <div class="bg-gray-800 text-white rounded-md py-2 px-4 max-w-[85%] lg:max-w-[65%]">
                    <span class="flex justify-end text-green-600" style="margin: -5px -5px -2px 0px;">You</span>
                    ${message}
                </div>
            </div>`;

            document.querySelector('#inputMessage').value = "";
            }
        })

        // Receive private messages
        socket.on("privateMessage", ({ sender, message }) => {
            if (sender === selectedUser) {
                document.getElementById("chat-box").innerHTML += `<div class="received">${message}</div>`;
                console.log("message recived by " + selectedUser);
            }
        });