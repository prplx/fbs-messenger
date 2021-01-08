import { gql } from '@apollo/client';
import { MESSAGE } from './fragments';

export const GET_CHATS = gql`
  query GetChats {
    chats {
      id
      title
      group
      participants {
        user {
          avatar
          name
        }
      }
      messages(limit: 1, order_by: { created_at: desc }) {
        type
        content
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query($chatId: uuid!) {
    messages(where: { chat_id: { _eq: $chatId } }, limit: 10) {
      ...Message
    }
  }
  ${MESSAGE}
`;
