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
   @media (max-width: 768px) {
    margin: 20px 0 0 0;
  }
`;

const Bookmarked: React.FC = () => {
  const [bookmarkedTweets, setBookmarkedTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(db, "users", user.uid);

      // Listen for real-time updates from the Firestore user document
      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();

          if (userData && userData.bookmarked) {
            // Convert the bookmarked object into an array of tweet objects
            const bookmarkedTweetObjects = Object.keys(userData.bookmarked).map(tweetId => ({
              id: tweetId,
              ...userData.bookmarked[tweetId]
            })) as ITweet[];

            // Update state with the bookmarked tweets
            setBookmarkedTweets(bookmarkedTweetObjects);
          } else {
            // Handle case when there are no bookmarks
            setBookmarkedTweets([]);
          }
        } else {
          console.log("No user document found!");
          setBookmarkedTweets([]);
        }
      });

      // Clean up the Firestore listener when the component unmounts
      return () => unsubscribe();
    }
  }, []);

  const handleRemoveBookmark = (tweetId: string) => {
    // Filter out the tweet that was unbookmarked
    setBookmarkedTweets(prevTweets => prevTweets.filter(tweet => tweet.id !== tweetId));
  };
  
  return (
    <Container>
        {bookmarkedTweets.length > 0 ? (
        bookmarkedTweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} onRemoveBookmark={handleRemoveBookmark} />
        ))
      ) : (
        <p>No bookmarks found.</p>
      )}
    </Container>
  );
};

export default Bookmarked;
