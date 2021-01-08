import React, { useState, createContext, useEffect } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import { IconContext } from 'react-icons';
import client from './apolloClient';
import Layout from './components/Layout';
import { light, dark } from './theme';
import { Chat, User } from './types/Chat';
import currentUser from './stubs/user.json';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: ${({ theme }) => theme.bodyBackgroundColor};
    color: ${({ theme }) => theme.fontColor};
  }
`;

type GlobalContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeChat: Chat;
  setActiveChat: (chat: Chat) => void;
  currentUser: User;
};

type Theme = 'light' | 'dark';

export const GlobalContext = createContext<GlobalContextType>(null!);

const App = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [activeChat, setActiveChat] = useState<Chat>(null!);
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    if (window && window.localStorage) {
      const theme = localStorage.getItem('theme') as Theme;
      theme && setTheme(theme);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <GlobalContext.Provider
        value={{
          toggleTheme,
          theme,
          activeChat,
          setActiveChat,
          currentUser,
        }}
      >
        <ThemeProvider theme={theme === 'light' ? light : dark}>
          <IconContext.Provider
            value={{
              color: theme === 'light' ? light.iconsColor : dark.iconsColor,
              className: 'svg',
            }}
          >
            <GlobalStyles />
            <Layout />
          </IconContext.Provider>
        </ThemeProvider>
      </GlobalContext.Provider>
    </ApolloProvider>
  );
};

export default App;
