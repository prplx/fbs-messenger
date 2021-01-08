import React from 'react';
import styled, { useTheme } from 'styled-components';
import { FaCog } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { SiHipchat } from 'react-icons/si';
import Avatar from './Avatar';
import IconButton from './IconButton';
import useGlobalContext from '../hooks/useGlobalContext';

const Header = () => {
  const theme = useTheme();
  const { currentUser } = useGlobalContext();

  return (
    <Wrapper>
      <LeftBlock>
        <SiHipchat size="1.75rem" color={theme.blueColor} />
      </LeftBlock>
      <CenterBlock>
        <FaSearch size="1rem" />
        <SearchInput placeholder="Search..." />
      </CenterBlock>
      <RightBlock>
        <SettingsButton>
          <FaCog size="1.1rem" />
        </SettingsButton>
        <Avatar src={currentUser.avatar} />
      </RightBlock>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  padding: 0 2rem;
`;

const SettingsButton = styled(IconButton)`
  margin-right: 1.2rem;
`;

const LeftBlock = styled.div`
  flex-basis: 20%;
`;

const CenterBlock = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 80%;
  margin-left: 12%;
`;

const RightBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-basis: 20%;
`;

const SearchInput = styled.input`
  margin-left: 1rem;
  padding: 0.5rem 0.25rem;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.fontColor};
  background-color: ${({ theme }) => theme.backgroundColor};
  width: auto;
  font-size: 16px;

  &:focus {
    width: 50%;
  }

  &::placeholder {
    color: ${({ theme }) => theme.iconsColor};
  }
`;
