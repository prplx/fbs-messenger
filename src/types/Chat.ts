export type Chat = {
  id: string;
  group: boolean;
  title: string;
  participants: { user: User }[];
  messages: Message[];
  created_at: number;
};

export type Message = {
  id: string;
  type: string;
  content: string;
  user_id: string;
  user: User;
  created_at: number;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
};
