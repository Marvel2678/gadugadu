export function registerConversationSocket(io, socket) {
  socket.on("conversation:join", ({ conversation_id }) => {
    socket.join(`conversation:${conversation_id}`, () => {
      console.log("User has joined to conversation ", conversation_id);
    });
  });
  socket.on("conversation:leave", ({ conversation_id }) => {
    socket.leave(`conversation:${conversation_id}`);
  });
}
