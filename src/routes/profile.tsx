import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";
export interface ITweet {
    id: string;
    photo?: string;
    tweet: string;
    userId: string;
    username: string;
    createdAt: number;
  }
const ProfileBg = styled.div`
    width: 100%;
    height: 200px;
    background: url('https://images.unsplash.com/photo-1709487577432-9238a48c5a58?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center;
    background-size: cover;
    position: relative;
    
`;
const ProfileImg = styled.label`

    position: absolute;
    left: 40px;
    bottom: -90px;

`;
const ProfileBtn = styled.button`
    color: var(--blue500-primary, #0085FF);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: inline-flex;
    padding: 13px 21px 11px 21px;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    border: 2px solid var(--blue500-primary, #0085FF);
    position: absolute;
    right: 40px;
    bottom: -60px;
    cursor: pointer;
`;

const AvatarImg = styled.img`
    width: 180px;
    height: 180px;
  border-radius: 100px;
  background-color: black;
  object-fit: contain;
`;
const ProfileInfo = styled.div`
    padding-top: 107px;
    padding-left: 32px;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    gap: 4px;
    p:nth-child(1){
        span:first-child{
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }
        span:last-child{
            color: var(--gray600, #606E7B);
            /* txt-base */
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
    }
    
    .comment{
        color: var(--light-text-color, #222528);
        /* txt-base */
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
;
    p:nth-child(3){
        span{
            color: var(--light-text-color, #222528);
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }
        span:first-child{margin-right:8px;}
        
        .following::before{
            content: '팔로잉';
            color: var(--gray600, #606E7B);
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            margin-right: 8px;
        }
        .followers::before{
            content: '팔로워';
            color: var(--gray600, #606E7B);
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            margin-right: 8px;
        }
    }
`;
const AvatarInput = styled.input`
  display: none;
`;

const Name = styled.span`
  font-size: 22px;
`;

export default function Profile(){
    const user = auth.currentUser;
    const [avatar, setAvatar] = useState(user?.photoURL);
    const onAvatarChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if(!user) return;
        if(files && files.length === 1){
            const file = files[0];
            const locationRef = ref(storage, `avatars/${user?.uid}`);
            const result = await uploadBytes(locationRef, file);
            const avatarUrl = await getDownloadURL(result.ref);
            setAvatar(avatarUrl);
            await updateProfile(user, {photoURL:avatarUrl,});
        }
    }
    const [tweets, setTweet] = useState<ITweet[]>([]);
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc")
      );
      const spanshot = await getDocs(tweetsQuery);
      const tweets = spanshot.docs.map((doc) => {
        const { tweet, createdAt, userId, username, photo } = doc.data();
        return {
          tweet,
          createdAt,
          userId,
          username,
          photo,
          id: doc.id,
        };
      });
      setTweet(tweets);
    };
    useEffect(() => {
      fetchTweets();
    }, []);
    return (
        <div>
            <ProfileBg>
                <ProfileImg htmlFor="avatar">
                    {avatar ? (
                        <AvatarImg src={avatar}/>
                    ) : (
                        <AvatarImg src="../../public/profileImg.png"/>
                    )}
                </ProfileImg>
                <ProfileBtn>프로필수정</ProfileBtn>
            </ProfileBg>
            <AvatarInput
                onChange={onAvatarChange}
                id="avatarBg"
                type="file"
                accept="image/*"
            />
            <AvatarInput
                onChange={onAvatarChange}
                id="avatar"
                type="file"
                accept="image/*"
            />
            <ProfileInfo>
                <p>
                    <Name>{user?.displayName ?? "Anonymous"}</Name>
                    <span>@{user?.displayName ?? "Anonymous"}</span>
                </p>
                <p className="comment">솰라솰라 자기소개 한마디 욜로로</p>
                <p>
                    <span className="following">100</span>
                    <span className="followers">101</span>
                </p>
            </ProfileInfo>
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} {...tweet} />
            ))}
        </div>
    );
}