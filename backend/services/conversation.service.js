import { db } from "../index.js";

export const getUserConversations = async (userID) => {
  try {
    const result = await db.query(
      `
      SELECT
        c.id AS conversation_id,
        c.is_group,
        MAX(m.created_at) AS last_message_at,
        MAX(m.text) FILTER (WHERE m.created_at = (
          SELECT MAX(created_at)
          FROM messages
          WHERE conversation_id = c.id
        )) AS last_message
      FROM conversations c
      JOIN conversation_members cm ON cm.conversation_id = c.id
      LEFT JOIN messages m ON m.conversation_id = c.id
      WHERE cm.user_id = $1
      GROUP BY c.id
      ORDER BY last_message_at DESC NULLS LAST
      `,
      [userID]
    );

    const conversations = result.rows;

    return conversations;
  } catch (err) {
    console.error("GET CONVERSATIONS ERROR:", err);
    return res.status(500).json({ ok: false });
  }
};
