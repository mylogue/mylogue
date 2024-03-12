import { styled } from "styled-components";
import { ITweet } from "./timeline";
const Wrapper = styled.div`
  display: grid;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 1px 1px 1px #E2E6EA;
`;

const Column = styled.div`
  padding: 15px 0 0 76px;
  position: relative;
  &:last-child {
    place-self: end;
  }
`;

const UserPic = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
    border-radius: 100px;
    background: #0085FF;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;
const Username = styled.span`
  font-weight: 800;
  font-size: 20px;
`;
const UserId = styled.span`
  font-weight: 600;
  font-size: 16px;
  color : #606E7B;
  margin-left: 8px;
`;
const Payload = styled.p`
  margin: 10px 0px;
  font-size: 16px;
  color: #384048;
  line-height: 120%;
`;
export default function Tweet({ userId, username, photo, tweet }: ITweet) {
  return (
    <Wrapper>
      <Column>
      <UserPic></UserPic>
        <Username>{username}</Username>
        <UserId>@{userId}</UserId>
        <Payload>{tweet}</Payload>
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}