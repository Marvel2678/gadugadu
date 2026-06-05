export type ChatType = {
  conversation_id: number;
  is_group: boolean;
  lastMessage: string;
  lastMessageAt: string;
  other_users: OtherUserType[];
};

export type OtherUserType = {
  user_id: number;
  username: string;
  avatar: string | null;
  online: boolean;
};
