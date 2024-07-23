import { styled } from "styled-components";
import { auth } from "../firebase";
import Tweet from "../components/tweet";
import { useState } from "react";

const BookMarked = styled.div`
 width: 100%;
`;

interface User {
    id: string;
    following?: Record<string, FollowInfo>;
  }
  
  interface FollowInfo {
    userId: string;
    userprofile: string;
    username: string;
  }
  
  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    list: User[];
  }
  
  // BookMarkedtimeline component
  const BookMarkedtimeline: React.FC<ModalProps> = ({ isOpen, onClose, list }) => {
    const user = auth.currentUser;
    if (!isOpen) return null;
  
    const followingFilter = list.filter(u => u.id === user?.uid);
    const isData = followingFilter.length > 0 && followingFilter.some(user => user.following && Object.keys(user.following).length > 0);
  
    return (
      <Box className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>Following</h2>
          <ul>
            {followingFilter.map((user) => (
              <li key={user.id}>
                {user.following && Object.values(user.following).map(following => (
                  <UserList key={following.userId}>
                    {following && following.userprofile ? ( <UserProfile src={following.userprofile} alt={following.username} />) : (<PiUserCircleDuotone />)}
                   
                    <Name>{following.username}</Name>
                    <ID>{following.userId.substring(0, 8)}</ID>
                  </UserList>
                ))}
              </li>
            ))}
          </ul>
          {!isData && <NoDataMessage>리스트 정보가 없습니다</NoDataMessage>}
        </div>
        <Closer onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Closer>
      </Box>
    );
  };


export default function Bookmarked() {
  return(
        <BookMarked />
  );
    
}