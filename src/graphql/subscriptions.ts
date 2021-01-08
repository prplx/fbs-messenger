import { gql } from '@apollo/client';
import { MESSAGE } from './fragments';

export const ON_MESSAGE_ADDED = gql`
  subscription($chatId: uuid!) {
    messages(
      where: { chat_id: { _eq: $chatId } }
      order_by: { created_at: desc }
      limit: 1
    ) {
      ...Message
    }
  }
  ${MESSAGE}
`;
