import styled from "styled-components";
import { auth } from "../firebase";
const NoDataMessage = styled.p`
  color: #606e7b;
  font-size: 1rem;
  margin: 1rem;
`;
const Box = styled.section`
position: relative;
display: flex;
flex-flow: column;
justify-content: center;
align-items: center;
background: white;
border-radius: 8px;
margin: 0 16px;
max-width: auto;
box-shadow: .0625rem .0625rem .0625rem #E2E6EA;
 ul{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    li{
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
    }
 }
 h2{
    text-align:center;
 }
`;
const Name = styled.span`
font-weight: 800;
font-size: 1.25rem;
`;
const ID = styled.span`
    font-weight: 600;
    font-size: 1rem;
    color: #606E7B;
    margin-left: .375rem;
`;
const UserList = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    height: auto;
    padding: 12px;
`;
const UserProfile = styled.img`
    display: inline-flex;
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 100px;
    object-fit: cover;
    cursor: pointer;
    margin-right: .5rem;
`;
const Closer = styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    width: 2.75rem;
    height: 2.75rem;
    padding: .25rem;
    cursor: pointer;
    z-index: 99;
    margin: .25rem;
`;


const FollowingModal = ({ isOpen, onClose, list }) => {
  const user = auth.currentUser;
  if (!isOpen) return null;
  const followingFilter = list.filter(u => u.id == user?.uid);
  const isData = Object.values(followingFilter).map(a => Object.values(a.following).map(b => b.username)[0]);
  return (
    <Box className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2> Following</h2>
        <ul>
          {followingFilter.map((user) => (
            <li key={user.id}>
              {user.following && typeof user.following === "object" && Object.values(user.following).map(followings => (
                <UserList>                
                    <UserProfile key={followings.id} src={followings.userprofile}></UserProfile>
                    <Name key={followings.id}>{followings.username}</Name>
                    <ID key={followings.id}>{followings.userId.substring(0, 8)}</ID>
                </UserList>
              ))}
            </li>
          ))}
        </ul>
        {isData[0] == undefined && <NoDataMessage>리스트 정보가 없습니다</NoDataMessage>}
      </div>
    <Closer>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"></path></svg>
        
    </Closer>
    </Box>
  );
};
const  FollowersModal = ({ isOpen, onClose, list }) => {
  const user = auth.currentUser;
  if (!isOpen) return null;
  const followerFilter = list.filter(u => u.id == user?.uid);
  const isData = Object.values(followerFilter).map(a => Object.values(a.followers).map(b => b.username)[0]);

  return (
    <Box className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Followers</h2>
        <ul>
          {followerFilter.map((user) => (
            <li key={user.id}>
              {user.followers && typeof user.followers === "object" && Object.values(user.followers).map(follower => (
                <UserList>                
                    <UserProfile key={follower.id} src={follower.userprofile}></UserProfile>
                    <Name key={follower.id}>{follower.username}</Name>
                    <ID key={follower.id}>{follower.userId.substring(0, 8)}</ID>
                </UserList>
              ))}
            </li>
          ))}
        </ul>
        {isData[0] == undefined && <NoDataMessage>리스트 정보가 없습니다</NoDataMessage>}
      </div>
    <Closer>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"></path></svg>
    </Closer>
    </Box>
  );
};

export { FollowingModal, FollowersModal };
