import styled from "styled-components";
import Tweet from "./tweet";

const CommentComponent = styled.div`
  background-color  : #fff;
  stroke: 1px solid black/0.5;
`;
const UserPic = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 100px;
    background: #0085FF;
    cursor: pointer;
`;
const Username = styled.span`
  font-weight: 800;
  font-size: 1.25rem;
  cursor: pointer;
`;

const Payload = styled.p`
  margin: .625rem 0rem;
  font-size: 1rem;
  color: #384048;
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
function CommentContent({username, tweet, userProfile,userId}) {
    console.log(tweet)
    return ( <>
        <CommentComponent>
            <div>
                <UserPic>
                {userProfile && <AvatarImg src={userProfile}></AvatarImg>}
                </UserPic>
                <Username>{username}</Username>
                <div>@{userId}</div>
                <Payload>{tweet}</Payload>
            </div>
        </CommentComponent>
    </> );
}

export default CommentContent;