document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.createElement("div");
    chatContainer.id = "gigi-chat-container";
    chatContainer.style.position = "fixed";
    chatContainer.style.bottom = "20px";
    chatContainer.style.right = "20px";
    chatContainer.style.width = "300px";
    chatContainer.style.height = "400px";
    chatContainer.style.background = "white";
    chatContainer.style.border = "1px solid #ccc";
    chatContainer.style.borderRadius = "10px";
    chatContainer.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
    chatContainer.style.padding = "10px";
    chatContainer.style.display = "flex";
    chatContainer.style.flexDirection = "column";
    chatContainer.style.fontFamily = "Arial, sans-serif";
  
    const toggleButton = document.createElement("button");
    toggleButton.innerText = "Chat";
    toggleButton.style.position = "fixed";
    toggleButton.style.bottom = "20px";
    toggleButton.style.right = "20px";
    toggleButton.style.padding = "10px 15px";
    toggleButton.style.background = "#007bff";
    toggleButton.style.color = "white";
    toggleButton.style.border = "none";
    toggleButton.style.borderRadius = "5px";
    toggleButton.style.cursor = "pointer";
  
    let isChatVisible = true;
    toggleButton.onclick = function () {
      isChatVisible = !isChatVisible;
      chatContainer.style.display = isChatVisible ? "flex" : "none";
    };
  
    const messages = document.createElement("div");
    messages.style.flex = "1";
    messages.style.overflowY = "auto";
    messages.style.marginBottom = "10px";
    messages.innerHTML = `<div style="background:#f1f1f1;padding:8px;border-radius:5px;margin-bottom:5px;">
        <strong>Gigi:</strong> Hey, what shall we do today?
      </div>`;
  
    const inputContainer = document.createElement("div");
    inputContainer.style.display = "flex";
  
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type your message...";
    input.style.flex = "1";
    input.style.padding = "5px";
    input.style.border = "1px solid #ccc";
    input.style.borderRadius = "5px";
    input.style.marginRight = "5px";
  
    const sendButton = document.createElement("button");
    sendButton.innerText = "Send";
    sendButton.style.padding = "5px 10px";
    sendButton.style.background = "#007bff";
    sendButton.style.color = "white";
    sendButton.style.border = "none";
    sendButton.style.borderRadius = "5px";
    sendButton.style.cursor = "pointer";
  
    sendButton.onclick = function () {
      if (input.value.trim() === "") return;
      const userMessage = `<div style="background:#dcf8c6;padding:8px;border-radius:5px;margin-bottom:5px;text-align:right;">
          <strong>You:</strong> ${input.value}
        </div>`;
      messages.innerHTML += userMessage;
  
      setTimeout(() => {
        const gigiResponse = `<div style="background:#f1f1f1;padding:8px;border-radius:5px;margin-bottom:5px;">
            <strong>Gigi:</strong> You're closer than you think.
          </div>`;
        messages.innerHTML += gigiResponse;
        messages.scrollTop = messages.scrollHeight;
      }, 1000);
  
      input.value = "";
    };
  
    inputContainer.appendChild(input);
    inputContainer.appendChild(sendButton);
    chatContainer.appendChild(messages);
    chatContainer.appendChild(inputContainer);
    document.body.appendChild(toggleButton);
    document.body.appendChild(chatContainer);
  });
  