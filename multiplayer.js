import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { app } from "./firebaseConfig";

const database = getDatabase(app);

function joinRoom() {
    const roomId = document.getElementById("fname").value.trim(); // Get the room ID from the input field
    // Check if room ID is not empty
    let data = {
        owner: 1,
        player: 0
    };
    if (roomId !== "") {
        // Reference to the "rooms" node in the Realtime Database
        const roomsRef = ref(database, `rooms/${roomId}`);

        // Set the room data with room ID as the key
        set(roomsRef, data)
            .then(() => {
                console.log("Room data added to the database successfully!");
                // Clear the input field after successful submission
                document.getElementById("fname").value = "";
            })
            .catch((error) => {
                console.error("Error adding room data to the database: ", error);
            });
    } else {
        console.log("Please enter a valid room ID.");
    }
}
document.getElementById("join_btn").addEventListener("click", joinRoom);