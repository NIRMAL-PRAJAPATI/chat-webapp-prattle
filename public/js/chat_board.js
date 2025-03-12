// // const socket = io();

// function getCookie(name) {
//     const cookies = document.cookie.split('; ');
//     for (const cookie of cookies) {
//         const [key, value] = cookie.split('=');
//         if (key === name) {
//             return decodeURIComponent(value);
//         }
//     }
//     return null;
// }

//     let currentRoom = "<%= roomId %>";
//     socket.emit("startPrivateChat", { user1: "<%= user1 %>", user2: "<%= user2 %>" });
 
//         // Send message
//         const sendMessagebtn = document.querySelector('#sendChatInput');
//           sendMessagebtn.addEventListener('submit' , (e) => {
//             e.preventDefault();
//             console.log(currentRoom);

//             let message = document.querySelector('#inputMessage').value;
//             socket.emit("privateMessage", { roomId: currentRoom, sender: "<%= user1 %>", message });

//             if (message.length > 0) {
//                 // Display sent message in chatbox
//                 document.querySelector('#chatBox').innerHTML += `<div id="sendMessage" class="flex justify-end">
//                 <div class="bg-gray-800 text-white rounded-md py-2 px-4 max-w-[85%] lg:max-w-[65%]">
//                     <span class="flex justify-end text-green-600" style="margin: -5px -5px -2px 0px;">You</span>
//                     ${message}
//                 </div>
//             </div>`;

//             document.querySelector('#inputMessage').value = "";
//             }
//         })

//         socket.on("privateMessage", ({sender, message}) => {
//             console.log("private message sender: " + sender + ", message: " + message);

//             document.querySelector('#chatBox').innerHTML += `<div id="recieveMessage" class="flex justify-start">
//                 <div class="bg-gray-800 rounded-lg py-2 px-4 text-white max-w-[85%] lg:max-w-[65%]">
//                     <span class="flex justify-start text-blue-600"
//                         style="margin: -5px 0px 0px -5px;">${sender}</span>
//                     ${message}
//                 </div>
//             </div>`
//         })