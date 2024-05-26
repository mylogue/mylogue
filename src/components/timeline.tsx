import { collection,
  limit,
  onSnapshot,
  orderBy,
  query, } from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userProfile:string | null | undefined;
  userId: string;
  username: string;
  createdAt: number;
  comment?: { [key: string]: any }[];
}

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  margin-top: 1.875rem;
`;

export default function Timeline() {

  const [tweets, setTweet] = useState<ITweet[]>([]);
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );

      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { tweet, createdAt,comment, userId, username, userProfile, photo } = doc.data();
         
          return {
            tweet,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
            userProfile,
            comment
          };
        });
        setTweet(tweets);
        
      });
    
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  console.log(tweets)
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}