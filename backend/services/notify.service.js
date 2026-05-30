import { db } from "../index.js";

export const notifyService = {
  sendNotification: async (ExpoService, tokens, title) => {
    const messages = tokens
      // .filter(ExpoService.isExpoPushToken)
      .map((token) => ({
        to: token,
        sound: "default",
        title,
        body: "Masz nową wiadomość",
      }));

    const chunks = ExpoService.chunkPushNotifications(messages);

    for (const chunk of chunks) {
      await ExpoService.sendPushNotificationsAsync(chunk);
    }
  },
  getPushTokens: async (conversation_id, userId) => {
    try {
      const result = await db.query(
        "SELECT token FROM push_tokens join conversation_members on push_tokens.user_id = conversation_members.user_id WHERE conversation_members.conversation_id = $1 AND conversation_members.user_id != $2",
        [conversation_id, userId],
      );
      console.log(
        "PUSH TOKENS:",
        result.rows.map((row) => row.token),
      );
      return result.rows.map((row) => row.token);
    } catch (error) {
      throw new Error("Could not retrieve push tokens");
    }
  },
};
