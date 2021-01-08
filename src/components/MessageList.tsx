import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Message from './Message';
import { Message as TMessage, Chat } from '../types/Chat';
import { GET_MESSAGES } from 'graphql/queries';
import { ON_MESSAGE_ADDED } from 'graphql/subscriptions';
import useHookWithRefCallback from '../hooks/useHookWithRefCallback';

type Props = {
  activeChat: Chat;
};

const MessageList = ({ activeChat }: Props) => {
  const [scrollRef] = useHookWithRefCallback(() => {
    // TODO: Detect scroll to top and load more messages
  });

  const { loading, error, data, subscribeToMore } = useQuery<{
    messages: TMessage[];
  }>(GET_MESSAGES, {
    variables: { chatId: activeChat.id },
    onCompleted: () => {
      subscribeToMore({
        document: ON_MESSAGE_ADDED,
        variables: { chatId: activeChat.id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data || !subscriptionData.data.messages)
            return prev;
          const result = [
            ...prev.messages,
            ...(prev.messages[prev.messages.length - 1].id ===
            subscriptionData.data.messages[0].id
              ? []
              : subscriptionData.data.messages),
          ];

          return {
            messages: result,
          };
        },
      });
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error || !data || !data.messages) return <p>Error :(</p>;

  const { messages } = data;

  return (
    <Wrapper ref={scrollRef}>
      {Boolean(messages.length) ? (
        messages.map((message, i) => (
          <Message
            message={message}
            isLastInGroup={Boolean(
              !messages[i + 1] ||
                messages[i].user_id !== messages[i + 1].user_id
            )}
            key={message.id}
          />
        ))
      ) : (
        <NoMessagesMessage>No messages yet</NoMessagesMessage>
      )}
    </Wrapper>
  );
};

export default MessageList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  padding: 2rem;
  overflow-y: auto;
`;

const NoMessagesMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  font-size: 2rem;
  color: ${({ theme }) => theme.iconsColor};
`;
