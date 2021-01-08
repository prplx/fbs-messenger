import styled from 'styled-components';

type Props = {
  width?: string;
  height?: string;
};

const Avatar = styled.img<Props>`
  width: ${({ width }) => (width && width) || '2.2rem'};
  height: ${({ height }) => (height && height) || '2.2rem'};
  border-radius: 50%;
`;

export default Avatar;
