import {
  createMessageFunc,
  getMessagesFromPrivateConversations,
} from "../services/messages.service.js";

export const getMessages = async (req, res) => {
  const { conversation_id } = req.params;
  try {
    const messages = await getMessagesFromPrivateConversations(conversation_id);
    return res.status(200).json({ messages });
  } catch (error) {
    console.error("GET MESSAGES ERROR:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong with fetching messages" });
  }
};

export const createMessage = async (req, res) => {
  const { conversation_id, sender_id, type, text } = req.body;
  try {
    if ((!conversation_id, !sender_id || !type || !text)) {
      return res.status(400).json({ error: "Invalid message data" });
    }
    const { message_id } = await createMessageFunc(
      conversation_id,
      sender_id,
      type,
      text
    );

    return res.status(201).json({
      message: { id: message_id, conversation_id, sender_id, type, text },
    });
  } catch (error) {
    console.error("CREATE MESSAGE ERROR:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong with sending message" });
  }
};
