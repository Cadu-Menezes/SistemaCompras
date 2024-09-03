import styled from "styled-components";

const AvatarContainer = styled.button`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  overflow: hidden;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none;

  &:focus {
    outline: none;
  }
`;

const AvatarImagem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Avatar = ({ src, alt, size, onClick }) => {
  return (
    <AvatarContainer size={size} onClick={onClick}>
      <AvatarImagem src={src} alt={alt} />
    </AvatarContainer>
  );
};

export default Avatar;