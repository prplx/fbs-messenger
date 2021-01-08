import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Chat from './Chat';
import useGlobalContext from '../hooks/useGlobalContext';
import { Chat as TChat } from '../types/Chat';
import { GET_CHATS } from 'graphql/queries';

const ChatList = () => {
  const { activeChat, setActiveChat } = useGlobalContext();
  const { loading, error, data } = useQuery<{ chats: TChat[] }>(GET_CHATS);

  useEffect(() => {
    if (!activeChat && data && data.chats) setActiveChat(data.chats[0]);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error || !data || !data.chats) return <p>Error :(</p>;

  return (
    <Wrapper>
      {data.chats.map(chat => (
        <Chat
          chat={chat}
          active={activeChat && activeChat.id === chat.id}
          key={chat.id}
          onClick={setActiveChat}
        />
      ))}
    </Wrapper>
  );
};

export default ChatList;

const Wrapper = styled.div`
  padding: 1rem 0;
`;
