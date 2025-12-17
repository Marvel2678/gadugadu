import { db } from "../index.js";
import { getMessagesFromPrivateConversations } from "./messages.js";

export const createConversation = async (req, res) => {
  try {
    const { users } = req.body; // array user IDs
    const user_from_req = req.user.id;

    //Checking is there private conversation in database and returning conversations.id
    if (users.length === 1) {
      const otherUserId = users[0].id;
      const myUserId = req.user.id;

      const existsConversation = await db.query(
        `
      SELECT c.id
      FROM conversations c
      JOIN conversation_members cm ON cm.conversation_id = c.id
      WHERE c.is_group = FALSE
        AND cm.user_id IN ($1, $2)
      GROUP BY c.id
      HAVING COUNT(DISTINCT cm.user_id) = 2
      `,
        [myUserId, otherUserId]
      );

      if (existsConversation.rowCount > 0) {
        return res.json({
          ok: true,
          conversation_id: existsConversation.rows[0].id,
          existed: true,
        });
      }
    }

    const result = await db.query(
      "INSERT INTO conversations (is_group) VALUES (FALSE) RETURNING id"
    );

    const conversation_id = result.rows[0].id;

    await db.query(
      `INSERT INTO conversation_members (name, conversation_id, user_id)
       VALUES ($1, $2, $3)`,
      ["Konwersacja prywatna", conversation_id, user_from_req]
    );

    for (const user of users) {
      await db.query(
        `INSERT INTO conversation_members (name, conversation_id, user_id)
         VALUES ($1, $2, $3)`,
        [`Konwersacja z ${user_from_req}`, conversation_id, user.id]
      );
    }

    return res.status(201).json({
      ok: true,
      conversation_id,
      existed: false,
    });
  } catch (error) {
    console.error("CREATE CONVERSATION ERROR:", error);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};

export const getConversationMessages = async (req, res) => {
  const { conversation_id } = req.body;

  try {
    const messages = await getMessagesFromPrivateConversations(conversation_id);

    res.json({ ok: true, messages });
  } catch (error) {
    console.error("GET MESSAGES ERROR:", error);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

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
      [userId]
    );

    return res.json({ ok: true, conversations: result.rows });
  } catch (err) {
    console.error("GET CONVERSATIONS ERROR:", err);
    return res.status(500).json({ ok: false });
  }
};
