import React from 'react';
import styled, { css } from 'styled-components';
import { Chat as TChat } from '../types/Chat';
import Avatar from './Avatar';

type Props = {
  chat: TChat;
  active: boolean;
  onClick: (chat: TChat) => void;
};

const Chat = ({ chat, active, onClick }: Props) => (
  <Wrapper active={active} onClick={() => onClick(chat)}>
    <Images>
      <Image src={chat.participants[0].user.avatar} />
      {chat.group && <Image src={chat.participants[1].user.avatar} />}
    </Images>
    <Text group={chat.group}>
      <TitleText>{chat.title}</TitleText>
      {Boolean(chat.messages.length) && (
        <PreviewText
          dangerouslySetInnerHTML={{
            __html: chat.messages[chat.messages.length - 1].content,
          }}
        ></PreviewText>
      )}
    </Text>
  </Wrapper>
);

export default Chat;

const activeStyles = css`
  padding-left: 1rem;
  border-left: ${({ theme }) => `3px solid ${theme.blueColor}`};
`;

const Wrapper = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  margin: 0.4rem 0;
  padding: 0.6rem 0;
  ${({ active }) => active && activeStyles}

  &:hover {
    ${activeStyles}
    cursor: pointer;
  }
`;

const Images = styled.div`
  display: flex;
  align-items: center;

  img {
    &:nth-child(1) {
      width: 2.7rem;
      height: 2.7rem;
      border: 3px solid ${({ theme }) => theme.backgroundColor};
      z-index: 1;
    }

    &:nth-child(2) {
      z-index: 0;
      left: -0.7rem;
    }
  }
`;

const Image = styled(Avatar)`
  position: relative;
`;

const Text = styled.div<{ group: boolean }>`
  flex: 1;
  margin-left: ${({ group }) => (group ? `0.3` : `1`)}rem;
  overflow: hidden;
`;

const TitleText = styled.div`
  line-height: 1.6rem;
`;

const PreviewText = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.descriptionFontColor};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  & img {
    width: 1rem;
    vertical-align: bottom;
  }
`;
