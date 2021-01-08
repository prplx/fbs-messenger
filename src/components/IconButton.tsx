import React, { useContext, forwardRef, Ref } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../App';

const IconButton = forwardRef(
  <T extends React.HTMLProps<HTMLButtonElement>>(
    { children, className, ...rest }: T,
    ref: Ref<HTMLButtonElement>
  ) => {
    const { theme } = useContext(GlobalContext);

    return (
      <Button mode={theme} className={className} ref={ref} {...rest}>
        {children}
      </Button>
    );
  }
);

export default IconButton;

const Button = styled.button<{ mode: string }>`
  padding: 0;
  background: none;
  outline: none;
  cursor: pointer;
  border: none;

  & svg {
    vertical-align: middle;
  }

  &:hover {
    filter: brightness(${({ mode }) => (mode === 'light' ? '50%' : '150%')});
  }
`;
