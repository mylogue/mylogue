import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { getFirestore, addDoc, collection, doc, serverTimestamp, updateDoc, getDoc, setDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";

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
const TextArea = styled.textarea`
    width: 100%;
    height: 65%;
    padding: .9375rem 0 0 4.375rem;
    margin-bottom: 2.5rem;
    border: 1px solid black;
    resize: none;
    font-family: 'Noto Sans KR';
    &::-webkit-scrollbar {
        background: white;
      }
    &::-webkit-scrollbar-thumb{
    background: #F0F4F8;
    border-radius: 10px;
    }
    &::placeholder {
        font-size: 1rem;
        color: #384048;
    }
    &:focus {
        outline: none;
        border-color: #1d9bf0;
    }
`;
const SubmitBtn = styled.input`
    float: left;
    background-color: #0085FF;
    width: 5.5625rem;
    color: white;
    border: none;
    padding: .625rem 0rem;
    border-radius: 40px;
    font-size: .75rem;
    cursor: pointer;
    &:hover,
    &:active {
        opacity: 0.9;
    }
`;
const Form = styled.form`
  display: flex;
  width: 100%;
`;

const Comment = styled.p`
  display: flex;
  width: 100%;
`;
interface CommentContentProps {
  username: string;
  tweet: string;
  userProfile?: string | null;
  userId: string;
}

const CommentContent: React.FC<CommentContentProps> = ({id, username, tweet, userProfile, userId }) => {
  const [tweetContent, setTweetContent] = useState('');
  const [comment,setComment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect를 사용하여 userId가 변경될 때마다 사용자 정보를 가져옴
  useEffect(() => {
    if (userId) {
      // Firestore에서 해당 userId의 사용자 문서 가져오기
      const getUserDocument = async () => {
        try {
          const userDocRef = doc(db, 'tweets', id); // 'tweets' 컬렉션에서 해당 문서 참조
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            // 사용자 문서가 존재하면 트윗 내용을 업데이트하기 위해 현재 트윗 내용 가져오기
            const userData = userDocSnapshot.data();
            setTweetContent(userData.Comment || '');
            console.log('성공'); // 기존 트윗 내용 설정

            // 사용자 문서가 존재할 때 Comment 데이터를 가져와 comment 상태 설정
            const existingComments = userData.comment || [];
            setComment(existingComments);
          } else {
            console.log('사용자 문서를 찾을 수 없습니다.');
          }
        } catch (error) {
          console.error('사용자 정보를 가져오는 중 오류 발생:', error);
        }
      };

      getUserDocument();
    }
  }, [userId, id]); // userId 또는 id가 변경될 때마다 useEffect 실행
  // TextArea 입력 값 변경 시 호출되는 함수
  const onChange = (e) => {
    setTweetContent(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    if (!tweetContent.trim()) {
      alert('무슨 말을 하고 싶은지 입력해주세요.');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const tweetDocRef = doc(db, 'tweets', id); // 'tweets' 컬렉션에서 해당 문서 참조
  
      // 기존 문서의 Comment 필드 가져오기
      const tweetDocSnapshot = await getDoc(tweetDocRef);
      const existingComments = tweetDocSnapshot.data()?.comment || [];
  
      // 새로운 Comment 객체 생성
      const newComment = {
        content: tweetContent,
        createdAt: new Date().toISOString(),
      };
  
      const updatedComments = [...existingComments, newComment];
      console.log('업데이트된 Comments:', updatedComments);
  
      await updateDoc(tweetDocRef, {
        comment: updatedComments,
        // updatedAt: new Date() // 업데이트된 시간 추가
      });
  
      setComment(updatedComments); // 배열로 상태 업데이트
  
      console.log('트윗 문서가 성공적으로 업데이트되었습니다.');
  
      // 상태 초기화 및 알림 표시
      setIsLoading(false);
      alert('트윗이 성공적으로 업데이트되었습니다!');
    } catch (error) {
      console.error('트윗 업데이트 중 오류 발생:', error);
      setIsLoading(false);
      alert('트윗 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };
  

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
        <Form onSubmit={onSubmit}>
          <textarea
            rows={5}
            maxLength={180}
            value={tweetContent}
            onChange={onChange}
            placeholder="무슨 말을 하고 싶나요?"
          />
          <input
            type="submit"
            value={isLoading ? "Posting..." : "게시하기"}
            disabled={isLoading}
          />
        </Form>
        {comment.map((comments,index)=>(
          <Comment key={index}>{comments.content}</Comment>
        ))}
      </CommentComponent>
    </>
  );
}


export default CommentContent;