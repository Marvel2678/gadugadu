export const pushTokenService = {
  addPushToken: async (user_id, platform, device_id, token) => {
    try {
      if (!user_id || !platform || !device_id || !token) {
        throw new Error("Missing required parameters");
      }
      await db.query(
        "INSERT INTO push_tokens (user_id, device_id, token, platform, updated_at) VALUES ($1, $2, $3, $4, NOW()) ON CONFLICT (token) DO UPDATE SET user_id = EXCLUDED.user_id, device_id = EXCLUDED.device_id, platform = EXCLUDED.platform, updated_at = NOW()",
        [user_id, platform, device_id, token],
      );
    } catch (error) {
      throw new Error("Could not add push token");
    }
  },
  getPushTokens: async (conversation_id, userId) => {
    try {
      const result = await db.query(
        "SELECT token FROM push_tokens join conversation_members on push_tokens.user_id = conversation_members.user_id WHERE conversation_members.conversation_id = $1 AND conversation_members.user_id != $2",
        [conversation_id, userId],
      );
      return result.rows.map((row) => row.token);
    } catch (error) {
      throw new Error("Could not retrieve push tokens");
    }
  },
};
