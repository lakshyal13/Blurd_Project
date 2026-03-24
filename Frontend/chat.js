const API = "http://localhost:5000";

async function sendMessage() {
    const user = document.getElementById("username").value;
    const text = document.getElementById("message").value;

    if (!user || !text) return;

    await fetch(API + "/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user, text })
    });

    document.getElementById("message").value = "";
    loadMessages();
}

async function loadMessages() {
    const res = await fetch(API + "/messages");
    const data = await res.json();

    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = "";

    data.forEach(msg => {
        const color =
            msg.mood === "positive" ? "#22c55e" :
            msg.mood === "negative" ? "#ef4444" :
            "#e2e8f0";

        chatBox.innerHTML += `
            <p style="color:${color}">
                <b>${msg.user}</b>: ${msg.text}
                <small>(${msg.mood})</small>
            </p>
        `;
    });

    chatBox.scrollTop = chatBox.scrollHeight;
}


setInterval(loadMessages, 2000);

fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar-placeholder").innerHTML = data;
    });