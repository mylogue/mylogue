import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import styled from "styled-components";
import LoadingScreen from "../components/loading-screen";

// Styled-components for the bookmarked items
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const BookmarkItem = styled.div`
  background: #fff;
  padding: 15px;
  margin: 10px 0;
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  margin: 0 0 10px;
`;

const Content = styled.p`
  margin: 0;
`;

const Bookmarked: React.FC = () => {
  const [bookmarkedItems, setBookmarkedItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookmarkedItems = async () => {
      const user = auth.currentUser;
      if (user) {
        const bookmarksQuery = query(
          collection(db, "bookmarks"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(bookmarksQuery);
        const items: any[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setBookmarkedItems(items);
      }
      setIsLoading(false);
    };

    fetchBookmarkedItems();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      {bookmarkedItems.length > 0 ? (
        bookmarkedItems.map((item) => (
          <BookmarkItem key={item.id}>
            <Title>{item.title}</Title>
            <Content>{item.content}</Content>
          </BookmarkItem>
        ))
      ) : (
        <p>No bookmarks found.</p>
      )}
    </Container>
  );
};

export default Bookmarked;