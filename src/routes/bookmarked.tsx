import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import styled from "styled-components";
import Tweet from "../components/tweet";  // 경로에 맞게 조정
import { ITweet } from "../components/timeline";  // 경로에 맞게 조정

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5625rem 1.25rem 0 2.5rem;
  gap: 1rem;
`;

const Bookmarked: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<ITweet[]>([]);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(db, "users", user.uid);  // 사용자 UID를 통해 정확한 문서 참조 설정
      // Firestore 스냅샷 리스너를 설정하여 실시간 업데이트를 수신
      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          // 'bookmarks'는 사용자 문서 내에 ITweet 배열 형태로 있는 필드라고 가정
          console.log(userData)
          if (userData && userData.bookmarks) {
            setBookmarks(userData.bookmarks);
          } else {
            // 북마크가 없는 경우 처리
            setBookmarks([]);
          }
        } else {
          console.log("No user document found!");
          setBookmarks([]);
        }
      });

      // 컴포넌트 언마운트 시 리스너 정리
      return () => unsubscribe();
    }
  }, []);

  console.log(bookmarks);  // 북마크 상태 로그 출력
  
  return (
    <Container>
      {bookmarks.map((bookmark, index) => (
        <Tweet key={bookmark.tweetId} {...bookmark} />
      ))}
    </Container>
  );
};

export default Bookmarked;
