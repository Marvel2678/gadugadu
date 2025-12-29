export function MessageSendingTester(socket) {
  try {
    socket.on("message:new", (msg) => {
      console.log("RECEIVED NEW MESSAGE: ", msg);
    });
    const testingTyping = () => {
      socket.emit("typing:start", { conversationId: 1 });
      console.log("✅ User is typing...");
      setTimeout(() => {
        socket.emit("typing:stop", { conversationId: 1 });
        console.log("✅ User stopped typing");
      }, 5000);
    };
    testingTyping();
    socket.emit("message:send", {
      conversationId: 1,
      text: "testowa wiadomość",
    });
    console.log("✅ SENDED MESSAGE");
  } catch (error) {
    console.log("ERROR IN MESSAGE SENDING TESTER: ", error);
  }
}
