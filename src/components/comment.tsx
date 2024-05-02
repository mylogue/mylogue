import styled from "styled-components";

const CommentComponent = styled.div`
  background-color  : #fff;
  stroke: 1px solid black/0.5;
  position: relative;
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  padding: 24px;
`;
const UserPic = styled.div`
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 100px;
    background: #0085FF;
    margin-right: 8px;
    cursor: pointer;
`;
const UserInfo = styled.div`
  width: calc(100% - 110px);
`;
const Username = styled.span`
  font-weight: 800;
  font-size: 1.25rem;
  cursor: pointer;
`;
const UserId = styled.span`
  font-weight: 800;
  font-size: 1.25rem;
  cursor: pointer;
  word-wrap: break-word;
`;
const Payload = styled.p`
  margin: .625rem 0rem;
  font-size: 1rem;
  color: #384048;
  width: 100%;
  line-height: 120%;
  padding-bottom: 1.875rem;
`;
const AvatarImg = styled.img`
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 100px;
    position: absolute;
    object-fit: contain;
    cursor: pointer;
`;

interface CommentContentProps {
  username: string;
  tweet: string;
  userProfile?: string | null;
  userId: string;
}

const CommentContent: React.FC<CommentContentProps> = ({ username, tweet, userProfile, userId }) => {
  return (
    <>
      <CommentComponent>
        <UserPic>
          {userProfile && <AvatarImg src={userProfile} />}
        </UserPic>
        <UserInfo>
          <Username>{username}</Username>
          <UserId>@{userId}</UserId>
        </UserInfo>
        <Payload>{tweet}</Payload>
      </CommentComponent>
    </>
  );
}


export default CommentContent;