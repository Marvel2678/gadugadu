import { db } from "../index.js";

export const presenceService = {
  IsUserOnline: async (conversationId, userId) => {
    const result = await db.query(
      `
      SELECT u.online
      FROM users u
      JOIN conversation_members cm ON cm.user_id = u.id
      WHERE cm.conversation_id = $1
        AND cm.user_id != $2
      LIMIT 1
      `,
      [conversationId, userId],
    );

    return result.rows[0]?.online ?? false;
  },
};
