import { styled } from "styled-components";
import { useState } from "react";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  display: grid;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 1px 1px 1px #E2E6EA;
`;

const Column = styled.div`
  padding: .3125rem 0 0 4.75rem;
  position: relative;
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

const AvatarImg = styled.img`
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 100px;
    position: absolute;
    object-fit: contain;
    cursor: pointer;
`;

const DeleteBtn = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    svg {
      width: 1.125rem;
      color: #606E7B;
      margin-right: .9375rem;
      cursor: pointer;
  }
`;

const Photo = styled.img`
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 15px;
  cursor: pointer;
`;

const Username = styled.span`
  font-weight: 800;
  font-size: 1.25rem;
  cursor: pointer;
`;

const UserId = styled.span`
  font-weight: 600;
  font-size: 1rem;
  color : #606E7B;
  margin-left: .5rem;
  cursor: pointer;
`;

const Payload = styled.p`
  margin: .625rem 0rem;
  font-size: 1rem;
  color: #384048;
  line-height: 120%;
  padding-bottom: 1.875rem;
`;

const TextBottom = styled.div`
  position: relative;
`;

const LeftIcon = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
    svg {
        width: 1.5rem;
        color: #0F172A;
        float: left;
        margin-right: .9375rem;
        cursor: pointer;
    }
`;

const RightIcon = styled.div`
    position: absolute;  
    right: 0;
    bottom: 0;
    svg {
        width: 1.5rem;  
        color: #0F172A;
        margin-right: .9375rem;
        cursor: pointer;
    }
`;



export default function Tweet({ userId, username, photo, tweet,id }: ITweet) {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };
  return (
    <Wrapper>
      <Column>
        <UserPic htmlFor="avatar">
         {avatar ? (
              <AvatarImg src={avatar}/>
          ) : (
              <AvatarImg src="../../public/profileImg.png"/>
          )}
        </UserPic>
        <Username>{username}</Username>
        <UserId>@{userId}</UserId>
        {user?.uid === userId ? (
        <DeleteBtn onClick={onDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </DeleteBtn>
        ) : null}
        <Payload>{tweet} {photo ? <Photo src={photo} /> : null} </Payload>
        <TextBottom>
          <LeftIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
            </svg>
          </LeftIcon>
          <RightIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
          </RightIcon>
        </TextBottom>
      </Column>
    </Wrapper>
  );
}