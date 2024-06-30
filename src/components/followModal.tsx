import React from "react";
import styled from "styled-components";

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
  box-shadow: 0.0625rem 0.0625rem 0.0625rem #e2e6ea;

  ul {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  h2 {
    text-align: center;
  }
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
  margin-right: 0.5rem;
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
  padding: 0.25rem;
  cursor: pointer;
  z-index: 99;
  margin: 0.25rem;
`;

interface User {
  id: string;
  following: { [key: string]: Following };
}

interface Following {
  id: string;
  userprofile: string;
  username: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  list: User[];
}

const FollowersModal: React.FC<ModalProps> = ({ isOpen, onClose, list }) => {
  if (!isOpen) return null;

  return (
    <Box className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Following</h2>
        <ul>
          {list.map((user) => (
            <li key={user.id}>
              {user.following &&
                typeof user.following === "object" &&
                Object.values(user.following).map((followings) => (
                  <UserList key={followings.id}>
                    <UserProfile src={followings.userprofile}></UserProfile>
                    <div>{followings.username}</div>
                  </UserList>
                ))}
            </li>
          ))}
        </ul>
      </div>
      <Closer onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Closer>
    </Box>
  );
};

const FollowingModal: React.FC<ModalProps> = ({ isOpen, onClose, list }) => {
  if (!isOpen) return null;

  return (
    <Box className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Followers</h2>
        <ul>
          {list.map((user) => (
            <li key={user.id}>
              {user.following &&
                typeof user.following === "object" &&
                Object.values(user.following).map((followings) => (
                  <UserList key={followings.id}>
                    <UserProfile src={followings.userprofile}></UserProfile>
                    <div>{followings.username}</div>
                  </UserList>
                ))}
            </li>
          ))}
        </ul>
      </div>
      <Closer onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Closer>
    </Box>
  );
};

export { FollowingModal, FollowersModal };
