import { Timestamp, setDoc, doc, getDoc, updateDoc, deleteField, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";

interface FollowButtonProps {
  username: string;
  id: string;
  userId: string;
}

const Btn = styled.button<{ isFollowing: boolean }>`
  background-color: ${({ isFollowing }) => (isFollowing ? "#dc3545" : "#007bff")};
  color: white;
  border: none;
  padding: 10px 20px;
  margin-left: auto;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ isFollowing }) => (isFollowing ? "#c82333" : "#0056b3")};
  }
`;

const FollowBtn: React.FC<FollowButtonProps> = ({ username, id, userId }) => {
  const user = auth.currentUser;
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);

      // Set up a Firestore snapshot listener for real-time updates
      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          if (userData && userData.follow && userData.follow[userId]) {
            setIsFollowing(true);
          } else {
            setIsFollowing(false);
          }
        }
      });

      // Clean up the listener on component unmount
      return () => unsubscribe();
    }
  }, [user, userId]);

  const handleFollow = async () => {
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();

          if (userData && userData.follow && userData.follow[userId]) {
            // Unfollow user
            await updateDoc(userDocRef, {
              [`follow.${userId}`]: deleteField()
            });
            console.log(`User ${username} with id ${userId} unfollowed by ${user.uid}`);
          } else {
            // Follow user
            await setDoc(userDocRef, {
              follow: {
                [userId]: { username, followedAt: Timestamp.now() }
              }
            }, { merge: true });
            console.log(`User ${username} with id ${userId} followed by ${user.uid}`);
          }
        } else {
          // Document does not exist, create a new one
          await setDoc(userDocRef, {
            follow: {
              [userId]: { username, followedAt: Timestamp.now() }
            }
          });
          console.log(`User ${username} with id ${userId} followed by ${user.uid}`);
        }
      } catch (error) {
        console.error("Error following user: ", error);
      }
    }
  };

  return (
    <Btn onClick={handleFollow} isFollowing={isFollowing}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Btn>
  );
}

export default FollowBtn;
