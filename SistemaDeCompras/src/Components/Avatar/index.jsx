import styled from "styled-components";

const AvatarContainer = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  overflow: hidden;
`;

const AvatarImagem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Avatar = ({ src, alt, size }) => {
  return (
    <AvatarContainer size={size}>
      <AvatarImagem src={src} alt={alt} />
    </AvatarContainer>
  );
};

export default Avatar;