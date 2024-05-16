
import { getDatabase, ref, set,child, get,update} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { app } from "./firebaseConfig.js";
const database = getDatabase(app);


let selected_img = "";
let play_btn = document.getElementById('btn_play');
const rightImg = document.getElementById('solo_img_right');
const leftImg = document.getElementById('solo_img_left');
const maintitle = document.getElementById('maintitle');

/* txt */
const txt_start = document.getElementById('txt_start');
const txt_countdown = document.getElementById('txt_count');

let roomId;

const txt_roomid = document.getElementById('roomid');

window.onload=function(){
    roomId=localStorage.getItem('room_id');
    txt_roomid.textContent="Room Id : "+roomId;     
    console.log("room : "+roomId);
}


const rightImgUrl = ['res/right_img/stone.png', 'res/right_img/paper.png', 'res/right_img/scissor.png'];
const leftImgUrl = ['res/left_img/stone.png', 'res/left_img/paper.png', 'res/left_img/scissor.png'];
let currentIndex = 0;

let selectImg = -1;

function changeLeftImg() {

    if(selectImg==-1){

        document.getElementById('solo_img_right').src = rightImgUrl[currentIndex];
    }
    
    

  document.getElementById('solo_img_left').src = leftImgUrl[2-currentIndex];
  currentIndex = (currentIndex + 1) % rightImgUrl.length;
}

let imgLoop ;


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


 // Flag to track whether the function is running


function delayedLoop(count) {

    maintitle.textContent='Let\'s Play!'
    imgLoop = setInterval(changeLeftImg, 200);
    txt_start.textContent='Count Down';
    function countTimer(c) {
        txt_countdown.textContent = c; // Update the text content of the <h3> element
        if(c==count){
            clearInterval(imgLoop);
            getSelectedMove();
        }
    }
    
    for (let i = 0; i <= count; i++) {
        setTimeout(() => countTimer(i), 500*i);
    }
    
}

const roomsRef = ref(database, `rooms/${roomId}`);


roomsRef.on('value', (snapshot) => {
    // This callback will be triggered whenever the data at 'path/to/data' changes
    const data = snapshot.val();
    console.log('Data changed:', data);
    if(data===1){
        delayedLoop(10);
        play_flag=false;
        play_btn.style.display='none';
    }else{
    play_btn.style.display='flex';
    }
   
  });
    



document.getElementById('btn_stone').addEventListener('click', function() {
    // Redirect to another pagex    x   
    selectImg=0;
    uploadOwnerChoice(0)
    rightImg.src='res/right_img/stone.png';
});

document.getElementById('btn_paper').addEventListener('click', function() {
    // Redirect to another page
    selectImg=1;
    uploadOwnerChoice(1)

    rightImg.src='res/right_img/paper.png';

});

document.getElementById('btn_scissor').addEventListener('click', function() {
    // Redirect to another page
    selectImg=2;
    uploadOwnerChoice(2)
    
    rightImg.src='res/right_img/scissor.png';

});

let playerMove = 0

function getSelectedMove(){
    
  
    try {
        get(child(ref(database), `rooms`)).then(snapshot => {
            const data = snapshot.val();

            playerCh = data;
            playerMove = playerCh[roomId]["owner"];  
        }).then(()=>{
            console.log("get o move : ",playerMove);
            leftImg.src=leftImgUrl[playerMove];
        
        
            if(selectImg==-1){
                selectImg=0;
            }
        
            if(playerMove==selectImg){
                maintitle.textContent= "Draw";
                
            }else if(playerMove==0 && selectImg==1){
                maintitle.textContent="You win !";
            }else if(playerMove==1 && selectImg==2){
                maintitle.textContent="You win !";
            }else if(playerMove==2 && selectImg==0){
                maintitle.textContent="You win !";
            }else{
                maintitle.textContent="Opponent wins";
            }
        
            resetAll();
        })
    } catch (error) {
        console.error("Error fetching data:", error);
        
    }

}

 

function resetAll(){
    play_btn.style.display='flex';
    play_flag=true;
    txt_start.textContent= "start";
    txt_countdown.textContent="";
    selectImg=-1;
    currentIndex=0;
}


let play_flag = true;

play_btn.addEventListener('click', function() {

    if(play_flag){
        delayedLoop(10);
        play_flag=false;
        play_btn.style.display='none';
    }
   
});

document.getElementById('btn_back').addEventListener('click',function(){
    window.history.back();

});


function uploadOwnerChoice(ch) {

    let data = {
        player: ch
    };
    if (ch !== "") {
        // Reference to the "rooms" node in the Realtime Database
        const roomsRef = ref(database, `rooms/${roomId}`);

        // Set the room data with room ID as the key
        update(roomsRef, data)
            .then(() => {
                console.log("Room data added to the database successfully!");
            })
            .catch((error) => {
                console.error("Error adding room data to the database: ", error);
            });
    }
}

let playerCh={};

function getPlayerChoice(){
    try {
        get(child(ref(database), `rooms`)).then(snapshot => {
            const data = snapshot.val();
            playerCh = data;
            console.log("Sameer choice : ",playerCh[roomId]["owner"]);
            return playerCh[roomId]["owner"];  

        })
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return 0;
}