import React from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import Header from './Header';
import ChatList from './ChatList';
import IconButton from './IconButton';
import MessageList from './MessageList';
import Footer from './Footer';
import useGlobalContext from '../hooks/useGlobalContext';

const Layout = () => {
  const { activeChat } = useGlobalContext();

  return (
    <Wrapper>
      <Header />
      <LeftAside>
        <ChatList />
        <AddChatButton>
          <FaPlus size="1.2rem" color="white" />
        </AddChatButton>
      </LeftAside>
      <Center>
        {activeChat && <MessageList activeChat={activeChat} />}
        <Footer />
      </Center>
      <RightAside />
      <ThemeToggle />
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.main`
  display: grid;
  grid-template-areas:
    'header header header'
    'left-aside center right-aside';
  grid-template-rows: 4.2rem auto;
  grid-template-columns: 25% auto 0;
  width: 100vw;
  height: calc(100vh - 4rem);
  max-width: 1396px;
  margin: 2rem auto;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.backgroundColor};
  overflow: hidden;
  position: relative;
`;

const LeftAside = styled.aside`
  grid-area: left-aside;
  position: relative;
  padding: 0 2rem;
  overflow: hidden;
`;

const Center = styled.div`
  grid-area: center;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
`;

const RightAside = styled.aside`
  grid-area: right-aside;
  display: none;
  border-left: 1px solid ${({ theme }) => theme.borderColor};
`;

const AddChatButton = styled(IconButton)`
  position: absolute;
  bottom: 5rem;
  left: 50%;
  transform: translateX(calc(-50% + 1rem));
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.blueColor};

  &:hover {
    filter: brightness(120%);
  }
`;
