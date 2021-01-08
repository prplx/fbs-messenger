import React, { useState, useEffect, useRef } from 'react';
import { Picker, BaseEmoji } from 'emoji-mart';
import uEmojiParser from 'universal-emoji-parser';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import styled from 'styled-components';
import { FaRegSmile } from 'react-icons/fa';
import { FiPaperclip } from 'react-icons/fi';
import { useMutation } from '@apollo/client';
import useGlobalContext from '../hooks/useGlobalContext';
import IconButton from './IconButton';
import { INSERT_MESSAGE } from '../graphql/mutations';
import 'emoji-mart/css/emoji-mart.css';

const Footer = () => {
  const { currentUser, activeChat, theme } = useGlobalContext();
  const [message, setMessage] = useState('');
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [sendMessage, { data, loading }] = useMutation(INSERT_MESSAGE);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    const content = inputRef.current?.innerHTML;

    if (e.key !== 'Enter' || !content) return;

    e.preventDefault();

    await sendMessage({
      variables: {
        chatId: activeChat.id,
        userId: currentUser.id,
        type: 'text',
        content,
      },
    });

    setMessage('');
  };

  const onChange = (e: ContentEditableEvent) => {
    setMessage(e.target.value);
  };

  const togglePicker = () => setIsPickerVisible(!isPickerVisible);

  const onSelectEmoji = (data: BaseEmoji) => {
    setMessage(message + uEmojiParser.parse(data.colons));
    setIsPickerVisible(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        !pickerRef.current?.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setIsPickerVisible(false);
      }
    };
    document.addEventListener('click', handler);

    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <Wrapper>
      <IconButton>
        <FiPaperclip size="1.2rem" />
      </IconButton>
      <MessageForm>
        <InputWrapper>
          <ContentEditable
            innerRef={inputRef}
            html={message}
            disabled={false}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </InputWrapper>
      </MessageForm>
      <IconButton onClick={togglePicker} ref={buttonRef}>
        <FaRegSmile size="1.2rem" />
      </IconButton>
      {isPickerVisible && (
        <PickerWrapper ref={pickerRef}>
          <Picker
            theme={theme}
            title=""
            emoji=""
            onSelect={onSelectEmoji}
            set="twitter"
          />
        </PickerWrapper>
      )}
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  height: 5rem;
  margin-left: 2rem;
  padding-right: 2rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const MessageForm = styled.div`
  display: flex;
  flex: 1;
  margin: 0 1rem;
`;

const InputWrapper = styled.div`
  flex: 1;
  border: none;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.messageInputBackgroundColor};
  outline: none;
  color: ${({ theme }) => theme.fontColor};
  font-size: 16px;

  & > div {
    padding: 0.9rem 1rem;

    :focus {
      outline: none;
    }
  }

  img {
    width: 1.2rem;
    vertical-align: bottom;
  }
`;

const PickerWrapper = styled.div`
  & > .emoji-mart {
    position: absolute;
    bottom: 4rem;
    right: 1rem;
  }

  & .emoji-mart-anchor-selected {
    .emoji-mart-anchor-icon {
      color: ${({ theme }) => theme.blueColor} !important;
    }
    .emoji-mart-anchor-bar {
      background-color: ${({ theme }) => theme.blueColor} !important;
    }
  }
`;
