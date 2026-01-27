import { db } from "../index.js";
import {
  getOtherUsers,
  getUserConversations,
} from "../services/conversation.service.js";

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
        [myUserId, otherUserId],
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
      "INSERT INTO conversations (is_group) VALUES (FALSE) RETURNING id",
    );

    const conversation_id = result.rows[0].id;

    await db.query(
      `INSERT INTO conversation_members (name, conversation_id, user_id)
       VALUES ($1, $2, $3)`,
      ["Konwersacja prywatna", conversation_id, user_from_req],
    );

    for (const user of users) {
      await db.query(
        `INSERT INTO conversation_members (name, conversation_id, user_id)
         VALUES ($1, $2, $3)`,
        [`Konwersacja z ${user_from_req}`, conversation_id, user.id],
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
  const userID = req.user.id;
  try {
    const conversations = await getUserConversations(userID);
    for (const conversation of conversations) {
      const otherUsers = await getOtherUsers(
        conversation.conversation_id,
        userID,
      );
      conversation.other_users = otherUsers;
    }
    for (const conversation of conversations) {
      console.log(conversation.other_users);
    }
    return res.json({ ok: true, conversations });
  } catch (error) {
    console.error("GET CONVERSATIONS ERROR:", error);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};

export const searchUsers = async (req, res) => {
  const query = req.query.q;
  try {
    if (query.length < 1 || !query) {
      return res.json({ ok: true, users: [] });
    }

    const data = await db.query(
      `
      SELECT u.id, u.username, u.name, u.avatar_url FROM users u WHERE name ILIKE $1 ORDER BY name LIMIT 5
      `,
      [`%${query}%`],
    );

    const users = data.rows;

    return res.json({ ok: true, users: users });
  } catch (error) {
    console.log("Something went wrong with searching a user", error);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong with searching a user",
    });
  }
};
