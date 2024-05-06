import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { getFirestore, addDoc, collection, doc, serverTimestamp, updateDoc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";

const CommentComponent = styled.div`
  background-color  : #fff;
  stroke: 1px solid black/0.5;
  position: relative;
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  padding: 1.5rem;
  border: 1px solid #bfbfbf;
  border-radius: .75rem;
  box-shadow: 0 3px 10px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
`;
const UserPic = styled.div`
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 100px;
    background: #0085FF;
    margin-right: .5rem;
    cursor: pointer;
`;
const UserInfo = styled.div`
  width: calc(100% - 6.875rem);
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
    height: 100%;
    padding: .9375rem ;

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
const CommentWrapper = styled.section`
  margin-top: 1.5rem;
  width: 100%;
`;
const Comment = styled.div`
  display: flex;
  flex-flow: column;
  border-bottom: 1px solid #eee;
  padding: .9375rem ;
  &:last-child {
    border-bottom: none;
  }
`;
const Info = styled.p`
  display: flex;
  gap: .25rem;
  span:nth-child(1){
    font-weight: 800;
  font-size: 1.25rem;
  cursor: pointer;
  }
  span:nth-child(2){
    font-weight: 500;
  font-size: 1rem;
  color : #606E7B;
  margin-left: .5rem;
  cursor: pointer;
  }
`;
const Content = styled.div`
  margin-top: .75rem;
`;
const DeleteBtn = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    svg {
      width: 1.125rem;
      color: #606E7B;
      margin-right: .9375rem;
      cursor: pointer;
  }
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
  const user = auth.currentUser;

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
        userId: user?.uid, // 로그인한 사용자의 ID
        username: username, // 로그인한 사용자의 이름
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
      setTweetContent('');
      setIsLoading(false);
      alert('트윗이 성공적으로 업데이트되었습니다!');
    } catch (error) {
      console.error('트윗 업데이트 중 오류 발생:', error);
      setIsLoading(false);
      alert('트윗 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };
  
  const onDelete = async (indexToDelete) => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid === comment.userId) return;
    try {
      const tweetDocRef = doc(db, 'tweets', id); // 'tweets' 컬렉션에서 해당 문서 참조

      // 기존 Comment 배열에서 삭제할 Comment 제외
      const updatedComments = comment.filter((_, index) => index !== indexToDelete);

      // Firestore 문서 업데이트
      await updateDoc(tweetDocRef, {
        comment: updatedComments,
        userId: user?.uid, // 로그인한 사용자의 ID
        username: username, // 로그인한 사용자의 이름
        updatedAt: new Date() // 업데이트된 시간 추가
      });
      console.log(userId)

      setComment(updatedComments); // 상태 업데이트

      console.log('트윗 문서가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('트윗 업데이트 중 오류 발생:', error);
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
          <TextArea
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
        <CommentWrapper>
          {comment.map((comments,index)=>(

            <>
              <Comment key={index}>
                <Info>
                  <span>{comments.username}</span>
                  <span>@{comments.userId.substring(0,8)}</span>
                </Info>
                <Content>{comments.content}</Content>
                {user?.uid === comments.userId ? (
                  <DeleteBtn onClick={() => onDelete(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </DeleteBtn>
                ) : null}
              </Comment>
            </>
          ))}
        </CommentWrapper>
        
      </CommentComponent>
    </>
  );
}


export default CommentContent;