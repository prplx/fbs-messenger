import React from 'react';
import styled from 'styled-components';
import { Message as TMessage } from '../types/Chat';
import useGlobalContext from '../hooks/useGlobalContext';
import Avatar from './Avatar';

type Props = {
  message: TMessage;
  isLastInGroup: boolean;
};

type WithMy = any & { my: boolean; isLastInGroup?: boolean };

const Message = ({ message, isLastInGroup }: Props) => {
  const { currentUser } = useGlobalContext();
  const my = message.user_id === currentUser.id;

  return (
    <Wrapper my={my} isLastInGroup={isLastInGroup}>
      <MessageBody
        my={my}
        dangerouslySetInnerHTML={{ __html: message.content }}
      ></MessageBody>
      {isLastInGroup && <AvatarStyled my={my} src={message.user.avatar} />}
    </Wrapper>
  );
};

export default Message;

const Wrapper = styled.div<WithMy>`
  display: flex;
  align-items: flex-end;
  flex-flow: ${({ my }) => (my ? `row` : `row-reverse`)};
  justify-content: ${({ my }) => (my ? `flex-start` : `flex-end`)};
  margin-left: ${({ my }) => (my ? `auto` : `0`)};
  margin-bottom: ${({ isLastInGroup }) => (isLastInGroup ? `3rem` : `0.4rem`)};
  padding-left: ${({ isLastInGroup }) => (isLastInGroup ? `0` : `3.2rem`)};
  padding-right: ${({ isLastInGroup }) => (isLastInGroup ? `0` : `3.2rem`)};

  &:last-child {
    margin-bottom: 0;
  }
`;

const MessageBody = styled.div<WithMy>`
  background: ${({ theme, my }) =>
    my ? theme.blueColor : theme.messageBackgroundColor};
  padding: 1rem;
  border-bottom-left-radius: ${({ my }) => (my ? `1.5rem` : `none`)};
  border-bottom-right-radius: ${({ my }) => (my ? `none` : `1.5rem`)};
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  font-size: 15px;
  color: ${({ theme, my }) =>
    my ? theme.myMessageFontColor : theme.messageFontColor};

  & img {
    vertical-align: bottom;
    width: 1.2rem;
  }
`;

const AvatarStyled = styled<WithMy>(Avatar)`
  margin-left: ${({ my }) => (my ? `1rem` : `0`)};
  margin-right: ${({ my }) => (my ? `0` : `1rem`)};
`;
