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
      [userID],
    );

    const conversations = result.rows;

    return conversations;
  } catch (err) {
    console.error("GET CONVERSATIONS ERROR:", err);
    return res.status(500).json({ ok: false });
  }
};

export const getOtherUsers = async (conversation_id, my_user_id) => {
  try {
    const result = await db.query(
      `
      SELECT
      u.id AS user_id,
      u.username,
      u.online,
      u.avatar_url as avatar
      FROM users u
      JOIN conversation_members cm ON u.id = cm.user_id
      WHERE cm.conversation_id = $1 AND cm.user_id != $2;
      `,
      [conversation_id, my_user_id],
    );
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.error("GET OTHER USERS ERROR:", err);
    return [];
  }
};

export const getConversationFromId = async (conversation_id, myUserId) => {
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
        )) AS last_message,
        other_users = (
          SELECT json_agg(json_build_object('user_id', u.id, 'username', u.username, 'avatar', u.avatar_url, 'online', u.online))
          FROM users u
          JOIN conversation_members cm ON u.id = cm.user_id
          WHERE cm.conversation_id = c.id AND cm.user_id != $2
        )
      FROM conversations c
      LEFT JOIN messages m ON m.conversation_id = c.id
      WHERE c.id = $1;
      `,
      [conversation_id, myUserId],
    );
    const conversation = result.rows[0];
    return conversation;
  } catch (err) {
    console.error("GET CONVERSATION FROM ID ERROR:", err);
    return null;
  }
};
