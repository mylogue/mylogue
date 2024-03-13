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
  padding: 5px 0 0 76px;
  position: relative;
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
  padding-bottom: 30px;
`;

const TextBottom = styled.div`
  position: relative;
`;

const LeftIcon = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
    svg {
        width: 24px;
        color: #0F172A;
        float: left;
        margin-right: 15px;
    }
`;

const RightIcon = styled.div`
    position: absolute;  
    right: 0;
    bottom: 0;
    svg {
        width: 24px;  
        color: #0F172A;
        margin-right: 15px;
    }
`;



export default function Tweet({ userId, username, photo, tweet }: ITweet) {
  return (
    <Wrapper>
      <Column>
        <UserPic></UserPic>
        <Username>{username}</Username>
        <UserId>@{userId}</UserId>
        <Payload>{tweet} {photo ? <Photo src={photo} /> : null} </Payload>
        <TextBottom>
          <LeftIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
            </svg>
          </LeftIcon>
          <RightIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
          </RightIcon>
        </TextBottom>
      </Column>
    </Wrapper>
  );
}