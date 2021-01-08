import { gql } from '@apollo/client';

export const INSERT_MESSAGE = gql`
  mutation($chatId: uuid!, $userId: uuid!, $type: String!, $content: String!) {
    insert_messages_one(
      object: {
        chat_id: $chatId
        user_id: $userId
        type: $type
        content: $content
      }
    ) {
      id
    }
  }
`;
