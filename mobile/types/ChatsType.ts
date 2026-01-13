export type ChatType = {
  conversation_id: number;
  is_group: boolean;
  lastMessage: string;
  lastMessageAt: string;
  other_users: {
    user_id: number;
    username: string;
    online: boolean;
  }[];
};
