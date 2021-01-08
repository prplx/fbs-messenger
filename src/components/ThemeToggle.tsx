import React, { useContext } from 'react';
import styled, { useTheme } from 'styled-components';
import { FaMoon } from 'react-icons/fa';
import { GlobalContext } from '../App';
import IconButton from './IconButton';

const ThemeToggle = () => {
  const { toggleTheme, theme } = useContext(GlobalContext);
  const scTheme = useTheme();

  return (
    <Toggler onClick={toggleTheme} type="button">
      <FaMoon
        size="1.2rem"
        color={
          theme === 'light' ? scTheme.iconsColor : scTheme.iconsYellowColor
        }
      />
    </Toggler>
  );
};

export default ThemeToggle;

const Toggler = styled(IconButton)`
  position: absolute;
  left: 1.5rem;
  bottom: 1.5rem;
`;
