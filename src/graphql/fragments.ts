import { gql } from '@apollo/client';

export const MESSAGE = gql`
  fragment Message on messages {
    id
    type
    content
    user_id
    user {
      name
      avatar
    }
    created_at
  }
`;
