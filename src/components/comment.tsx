import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import {doc, updateDoc, getDoc } from "firebase/firestore";
interface Comment {
  content: string;
  userId: string;
  username: string;
  createdAt: string;
  userProfile: string | null | undefined;
}

interface CommentContentProps {
  id: string;
  username: string;
  tweet: string;
  userProfile?: string | null | undefined;
  userId: string;
}
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
    cursor: pointer;
`;

const AvatarImg = styled.img`

    display: inline-flex;
    min-width: 3.75rem;
    height: 3.75rem;
    border-radius: 100px;
    position: absolute;
    object-fit: cover;
    cursor: pointer;
`;

const UserInfo = styled.div`
  width: calc(100% - 6.875rem);
  margin-top: 1.25rem;
`;
const Username = styled.span`
  font-weight: 800;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0 .625rem;
  word-break: break-all;
`;
const UserId = styled.span`
  font-weight: 400;
  font-size: .875rem;
  cursor: pointer;
  word-wrap: break-word;

`;
const Payload = styled.div`
  margin: .625rem 0rem;
  font-size: 1rem;
  color: #384048;
  padding: 0 .625rem;
  width: 100%;
  line-height: 120%;
  padding-bottom: 1.875rem;
`;
const Profile = styled.img`
    min-width: 3.75rem;
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 100px;
    object-fit: cover;
    cursor: pointer;
    align-items: center;
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

const Form = styled.form`
  display: flex;
  width: 100%;
`;
const CommentWrapper = styled.section`
  margin-top: 1.5rem;
  width: 100%;
  height: 21.9375rem;
  overflow: scroll;
`;
const Comment = styled.div`
  display: flex;
  flex-flow: row wrap;
  border-bottom: 1px solid #eee;
  padding: .9375rem ;
  &:last-child{border-bottom:none;}

`;
const Info = styled.div`
  display: flex;
  width: 100%;
  gap: .25rem;
  align-items: baseline;
  align-items: center;
  span:nth-child(1){
    font-weight: 800;
  font-size: 1.25rem;
  cursor: pointer;
  text-wrap: nowrap;
  }
  span:nth-child(2){
    font-weight: 500;
    font-size: .875rem;
    color : #606E7B;
    margin-left: .5rem;
    text-wrap: nowrap;
    cursor: pointer;
  }
`;
const Content = styled.div`
  margin-top: 1.25rem;
  display: flex;
  flex-flow: row wrap;
  width: 70%;
 
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
const FormattedDate = styled.span`
  display: flex;
  flex-flow: row wrap;
  width: 30%;
  margin-top: 1.25rem;
  justify-content: flex-end;
`;
interface CommentContentProps {
  username: string;
  tweet: string;
  userProfile?: string | null;
  userId: string;
  id:string;
  comment?: { [key: string]: any }[];
}

const CommentContent: React.FC<CommentContentProps> = ({ id, username, tweet, userProfile, userId }) => {
  const [tweetContent, setTweetContent] = useState('');
  const [comments, setComment] = useState<Comment[]>([]);
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
            
            const existingComments: Comment[] = userData.comment || [];
            const sortedComments = existingComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setComment(sortedComments);

            
            // // 사용자 문서가 존재할 때 Comment 데이터를 가져와 comment 상태 설정
            // const existingComments = userData.comment || [];
            // setComment(existingComments);
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
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTweetContent(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        username: user?.displayName, // 로그인한 사용자의 이름
        userProfile: user?.photoURL
      };

      const updatedComments = [...existingComments, newComment];
      console.log('업데이트된 Comments:', updatedComments);
  
      
      
      
      await updateDoc(tweetDocRef, {
        comment: updatedComments,
        // updatedAt: new Date() // 업데이트된 시간 추가
      });

      const sortedComments = updatedComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setComment(sortedComments);

      // setComment(updatedComments); // 배열로 상태 업데이트
  
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
  
  const onDelete = async (indexToDelete: number) => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok) return;
    try {
      const tweetDocRef = doc(db, 'tweets', id); // 'tweets' 컬렉션에서 해당 문서 참조

      // 기존 Comment 배열에서 삭제할 Comment 제외
      const updatedComments: Comment[] = comments.filter((_, index) => index !== indexToDelete);

      // Firestore 문서 업데이트
      await updateDoc(tweetDocRef, {
        comment: updatedComments,
        userId: user?.uid, // 로그인한 사용자의 ID
        username: user?.displayName, // 로그인한 사용자의 이름
        updatedAt: new Date(), // 업데이트된 시간 추가
        userProfile: user?.photoURL
      });
      
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
          <UserId>@{userId.substring(0,8)}...</UserId>
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
        {comments.map((comments1, index) => {
          const date = new Date(comments1.createdAt);
          const formattedDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
          const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

          
          return (
             
                  <Comment key={index}>
                      <Info>
                          <Profile src={comments1.userProfile ?? undefined} />

                          <span>{comments1.username}</span>
                          <span>@{comments1.userId.substring(0, 8)}...</span>
                          {user?.uid === comments1.userId ? (
                          <DeleteBtn onClick={() => onDelete(index)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                          </DeleteBtn>
                      ) : null}
                     
                      </Info>
                      <Content>{comments1.content}</Content>
                      <FormattedDate>{formattedDate} {formattedTime}</FormattedDate>
                  </Comment>
              
          );
      })}

        </CommentWrapper>
        
      </CommentComponent>
    </>
  );
}


export default CommentContent;