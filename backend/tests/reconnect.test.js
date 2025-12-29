export function ReconnectTester(socket) {
  socket.on("reconnect", (attempt) => {
    console.log("🔄 Reconnected after", attempt, "tries");
  });
}
