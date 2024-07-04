import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import Tweet from "../components/tweet";
import {FollowingModal, FollowersModal } from "../components/followModal"
import { useParams } from "react-router";
export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
  userProfile: string | null | undefined;
}

const ProfileBg = styled.div`
  width: 100%;
  height: 12.5rem;
  background: url('https://images.unsplash.com/photo-1709487577432-9238a48c5a58?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center;
  background-size: cover;
  position: relative;
`;

const ProfileImg = styled.label`
  position: absolute;
  left: 2.5rem;
  bottom: -5.625rem;
`;

const ProfileBtn = styled.button`
  color: var(--blue500-primary, #0085FF);
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: inline-flex;
  padding: 0.8125rem 1.3125rem 0.6875rem 1.3125rem;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  border: 2px solid var(--blue500-primary, #0085FF);
  position: absolute;
  right: 2.5rem;
  bottom: -3.75rem;
  cursor: pointer;
  &:hover,
  :active,
  :focus {
    background: #0085FF;
    color: white;
  }
`;

const AvatarImg = styled.img`
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 100px;
  background-color: black;
  object-fit: contain;
`;

const ProfileInfo = styled.div`
  padding-top: 6.6875rem;
  padding-left: 2rem;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  gap: 0.7rem;
  div:first-child {
    span:first-child {
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.625rem;
    }
    span:nth-child(2) {
      color: var(--gray600, #606E7B);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }

  .comment {
    color: var(--light-text-color, #222528);
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  p:nth-child(3) {
    span {
      color: var(--light-text-color, #222528);
      font-size: 1rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
    span:first-child {
      margin-right: 0.5rem;
    }
  }
  .count {
    span {
      margin-right: 1rem;
      font-weight: 600;
    }
    .following{cursor: pointer;}
    .followers{cursor: pointer;}
    .following::before {
      content: '팔로잉';
      color: var(--gray600, #606E7B);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-right: 0.5rem;
    }
    .followers::before {
      content: '팔로워';
      color: var(--gray600, #606E7B);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-right: 0.5rem;
    }
  }
`;

const AvatarInput = styled.input`
  display: none;
`;

const Name = styled.span`
  font-size: 1.375rem;
`;

const CommonBox = styled.article`
  background: #fff;
  border-radius: 8px;
  margin: 2rem;
`;

const DisplaynameInput = styled.input``;

const EditImg = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  color: #1d9bf0;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
  }
  &:hover {
    svg {
      opacity: 0.8;
    }
  }
`;

export default function UserProfile({params}) {
  let {id} = useParams();
  console.log(params)
  const user = auth.currentUser;
  const [name,setName] = useState();
  const [avatar, setAvatar] = useState();
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isFollowingModalOpen,setIsFollowingModalOpen] = useState(false);
  const [isFollowersModalOpen,setIsFollowersModalOpen] = useState(false);

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
    //   where("userId", "==", user?.uid),
       where("userId", "==", id),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userProfile, userId, username, photo } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
        userProfile,
      };
    });
    setTweets(tweets);
    setAvatar(userProfile)
    setName(username)
  };
  console.log(tweets)
  useEffect(() => {
    fetchTweets()
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
    //   const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const usersData = snapshot.docs.map(doc => ({ id: id, ...doc.data() }));
      // Filter users where the current user is either a follower or following
      // const filteredUsers = usersData.filter(u => {
      //   return (u => u.id == user?.uid);
      // });
      setUsers(usersData);
    });
  
    return () => unsubscribe();
  }, []);
  const followerCount = users.reduce((count, u) => {
    if (user && user.uid && u.following && u.following[user.uid]) {
      return count + 1;
    }
    return count;
  }, 0);
  
  const followingCount = users.reduce((count, u) => {
    if (user && user.uid && u.followers && u.followers[user.uid]) {
      return count + 1;
    }
    return count;
  }, 0);
  
  const toggleFollowingModal = () => {
    setIsFollowingModalOpen(!isFollowingModalOpen);
  };
  const toggleFollowersModal = () => {
    setIsFollowersModalOpen(!isFollowersModalOpen);
  };
  return (
    <div>
      <ProfileBg>
        <ProfileImg htmlFor="avatar">
          {avatar ? (
            <AvatarImg src={avatar} />
          ) : (
            <AvatarImg src="/profileImg.png" />
          )}
        </ProfileImg>
        <ProfileBtn>프로필수정</ProfileBtn>
      </ProfileBg>
      <AvatarInput
        id="avatar"
        type="file"
        accept="image/*"
      />
      <ProfileInfo>
        <div>
          <Name>
            {name}
          </Name>
          <span>@{user?.uid ?? "Anonymous"}</span>
        </div>
        <p className="comment">솰라솰라 자기소개 한마디 욜로로</p>
        <div className="count">
          <span className="following" onClick={toggleFollowingModal}>{followingCount}</span>
          <span className="followers" onClick={toggleFollowersModal}>{followerCount}</span>
        </div>
      </ProfileInfo>
      <FollowingModal
        isOpen={isFollowingModalOpen}
        onClose={toggleFollowingModal}
        list={users}
      />
      <FollowersModal
        isOpen={isFollowersModalOpen}
        onClose={toggleFollowersModal}
        list={users.filter(u => u.id == user?.uid)}
      />
      <CommonBox>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </CommonBox>
    </div>
  );
}
