// Function to handle joining a room
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { app } from "./firebaseConfig.js";

const database = getDatabase(app);
let room_Id ;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
document.getElementById("createroom").addEventListener("click", function () {
    createRoom();

});

document.getElementById("join_btn").addEventListener("click", function () {
    joinRoom();

});
let joinRoomId="";
function joinRoom(){
    joinRoomId = document.getElementById('ip_joinid').value;
    console.log("iddddd : ",joinRoomId)
     localStorage.setItem("room_id",joinRoomId);
   window.location.href = "room-player.html";
}



function createRoom() {
    room_Id = getRandomInt(123456, 999999);

    let data = {
        owner: 0,
        player: 0
    };
    if (room_Id !== "") {
        // Reference to the "rooms" node in the Realtime Database
        const roomsRef = ref(database, `rooms/${room_Id}`);

        // Set the room data with room ID as the key
        set(roomsRef, data)
            .then(() => {
                console.log("Room data added to the database successfully!");
                localStorage.setItem("room_id", room_Id)
                window.location.href = 'room-owner.html';
            })
            .catch((error) => {
                console.error("Error adding room data to the database: ", error);
            });
    }
}

// Event listener for join button click

