import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import Tweet from "../components/tweet";
export interface ITweet {
    id: string;
    photo?: string;
    tweet: string;
    userId: string;
    username: string;
    createdAt: number;
    userProfile:string | null | undefined;
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
    padding: .8125rem 1.3125rem .6875rem 1.3125rem;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    border: 2px solid var(--blue500-primary, #0085FF);
    position: absolute;
    right: 2.5rem;
    bottom: -3.75rem;
    cursor: pointer;
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
    gap: .7rem;
    p:nth-child(1){
        span:first-child{
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: .625rem;
        }
        span:last-child{
            color: var(--gray600, #606E7B);
            /* txt-base */
            font-size: 1rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
    }
    
    .comment{
        color: var(--light-text-color, #222528);
        /* txt-base */
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
;
    p:nth-child(3){
        span{
            color: var(--light-text-color, #222528);
            font-size: 1rem;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }
        span:first-child{margin-right:.5rem;}
        
       
    }
    .count{
        .following::before{
            content: '팔로잉';
            color: var(--gray600, #606E7B);
            font-size: 1rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            margin-right: .5rem;
        }
        .followers::before{
            content: '팔로워';
            color: var(--gray600, #606E7B);
            font-size: 1rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            margin-right: .5rem;
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

export default function Profile(){
    const user = auth.currentUser;
    const [avatar, setAvatar] = useState(user?.photoURL);
    const [tweets, setTweets] = useState<ITweet[]>([]);
    const [displayname, setDisplayname] = useState(user?.displayName ?? "");
    const [editDisplayname, setEditDisplayname] = useState(false);
    const onEditChange = async () => {
        if(!user) return;
        if(!editDisplayname){
            setEditDisplayname(true);
        } else{
            await updateProfile(user,{
                displayName:displayname,
            })
            setEditDisplayname(false);
        }
    }
    const onDisplaynameChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setDisplayname(e.target.value);
    }
    const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!user) return;
        if (files && files.length === 1) {
        const file = files[0];
        const locationRef = ref(storage, `avatars/${user?.uid}`);
        const result = await uploadBytes(locationRef, file);
        const avatarUrl = await getDownloadURL(result.ref);
        setAvatar(avatarUrl);
        console.log(avatarUrl)
        await updateProfile(user, {
            photoURL: avatarUrl,
        });

        }
    };
    const fetchTweets = async () => {
        const tweetQuery = query(
        collection(db, "tweets"),
        where("userId", "==", user?.uid),
        orderBy("createdAt", "desc"),
        limit(25)
        );
        const snapshot = await getDocs(tweetQuery);
        const tweets = snapshot.docs.map((doc) => {
        const { tweet, createdAt, userId, username, photo } = doc.data();
        return {
            tweet,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
            userProfile:user?.photoURL,
        };
        });
        setTweets(tweets);
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
                        <AvatarImg src="/profileImg.png"/>
                    )}
                </ProfileImg>
                <ProfileBtn>프로필수정</ProfileBtn>
            </ProfileBg>
            <AvatarInput
                onChange={onAvatarChange}
                id="avatar"
                type="file"
                accept="image/*"
            />
            <ProfileInfo>
                <div>
                    <Name>
                        {editDisplayname ? (
                             <DisplaynameInput
                             onChange={onDisplaynameChange}
                             placeholder={displayname}
                           />
                        ) : (
                            user?.displayName ?? "Anonymous"
                        )}
                        <EditImg onClick={onEditChange}>
                            {editDisplayname ? (
                                <svg
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                />
                                </svg>
                            ) : (
                                <svg
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                >
                                <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                                </svg>
                            )}
                        </EditImg>
                    </Name>
                    <span>@{user?.uid ?? "Anonymous"}</span>
                </div>
                <p className="comment">솰라솰라 자기소개 한마디 욜로로</p>
                <div className="count">
                    <span className="following">100</span>
                    <span className="followers">101</span>
                </div>
            </ProfileInfo>
            
            <CommonBox>
                {tweets.map((tweet) => (
                    <Tweet key={tweet.id} {...tweet} />
                ))}
                
            </CommonBox>
        </div>
    );
}