const socket = io("https://romantic-ptolemy-bf04b2.netlify.app/");

function Appendposition(pos, data) {
    let element = document.createElement("div");
    element.className = "chat_class"
    element.innerHTML = data;
    document.querySelector(`.${pos}`).appendChild(element)
}

socket.on("recieve", message => {
    console.log("message", message);
    Appendposition("right", message.messages)
})

socket.on("userJoined", joinname => {
    Appendposition("left", `${joinname} has join chat`)
    console.log("new user joined", joinname)
})

socket.on("left", name => {
    Appendposition("right", `${name} has left chat`)
    console.log("left user ", name);
})
let name = prompt("enter your name to enter the room");
socket.emit("try", name);

socket.on("welcome", name => {
    Appendposition("right", name);
})

const btn = document.querySelector(".btn");
const text = document.querySelector("#text");
btn.addEventListener("click", (e) => {

    e.preventDefault();
    let data = text.value;
    console.log(data)
    socket.emit("send", data);
    Appendposition("left", data);


    text.value = '';
})

