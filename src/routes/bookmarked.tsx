import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import styled from "styled-components";
import Tweet, { ITweet } from "../components/tweet";  // Assuming ITweet is the type for a tweet

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Bookmarked: React.FC = () => {
  const [bookmarkedTweets, setBookmarkedTweets] = useState<ITweet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchBookmarkedTweets = async () => {
      if (user) {
        try {
          // Fetch bookmarked tweet IDs
          const bookmarksQuery = query(
            collection(db, "bookmarks"),
            where("userId", "==", user.uid)
          );
          const bookmarksSnapshot = await getDocs(bookmarksQuery);
          const tweetIds = bookmarksSnapshot.docs.map(doc => doc.data().tweetId);
          
          // Fetch tweet details
          const tweetPromises = tweetIds.map(tweetId => getDoc(doc(db, "tweets", tweetId)));
          const tweetSnapshots = await Promise.all(tweetPromises);
          const tweets = tweetSnapshots.map(snapshot => ({ id: snapshot.id, ...snapshot.data() } as ITweet));

          setBookmarkedTweets(tweets);
        } catch (error) {
          console.error("Error fetching bookmarks: ", error);
        }
      } else {
        console.warn("No authenticated user found");
      }
      setIsLoading(false);
    };

    fetchBookmarkedTweets();
  }, [user]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      {bookmarkedTweets.length > 0 ? (
        bookmarkedTweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            userId={tweet.userId}
            username={tweet.username}
            comment={tweet.comment}
            userProfile={tweet.userProfile}
            createdAt={tweet.createdAt}
            photo={tweet.photo}
            tweet={tweet.tweet}
            id={tweet.id}
          />
        ))
      ) : (
        <p>No bookmarks found.</p>
      )}
    </Container>
  );
};

export default Bookmarked;