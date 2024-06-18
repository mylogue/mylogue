import { Timestamp, setDoc, doc, getDoc, updateDoc, deleteField, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";

interface FollowButtonProps {
  username: string;
  id: string;
  userId: string;
}

const shouldForwardProp = (prop: string) => prop !== 'isFollowing';

const Btn = styled.button.withConfig({ shouldForwardProp })<{ isFollowing: boolean }>`
  border: ${({ isFollowing }) => (isFollowing ? "1px solid #007bff" : "1px solid #007bff")};
  background-color: ${({ isFollowing }) => (isFollowing ? "transparent" : "#007bff")};
  color: ${({ isFollowing }) => (isFollowing ? "#007bff" : "white")};
  padding: 10px 20px;
  margin-left: auto;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    border: ${({ isFollowing }) => (isFollowing ? "1px solid #007bff" : "1px solid #0056b3")};
  }
`;


const FollowBtn: React.FC<FollowButtonProps> = ({ username, userId }) => {
  const user = auth.currentUser;
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.uid === userId) {
        return;  // Don't set up listener if the button is for the current user
      }

      const userDocRef = doc(db, "users", user.uid);

      // Set up a Firestore snapshot listener for real-time updates
      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          if (userData && userData.following && userData.following[userId]) {
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
        const followedUserDocRef = doc(db, "users", userId);

        const userDocSnap = await getDoc(userDocRef);
        const followedUserDocSnap = await getDoc(followedUserDocRef);

        if (userDocSnap.exists() && followedUserDocSnap.exists()) {
          const userData = userDocSnap.data();
          const followedUserData = followedUserDocSnap.data();

          if (userData && userData.following && userData.following[userId]) {
            // Unfollow user
            await updateDoc(userDocRef, {
              [`following.${userId}`]: deleteField()
            });
            await updateDoc(followedUserDocRef, {
              [`followers.${user.uid}`]: deleteField()
            });
            console.log(`User ${username} with id ${userId} unfollowed by ${user.uid}`);
          } else {
            // Follow user
            await updateDoc(userDocRef, {
              [`following.${userId}`]: { username, followedAt: Timestamp.now() }
            }, { merge: true });
            await updateDoc(followedUserDocRef, {
              [`followers.${user.uid}`]: { username: user.displayName, followedAt: Timestamp.now() }
            }, { merge: true });
            console.log(`User ${username} with id ${userId} followed by ${user.uid}`);
          }
        } else {
          // Document does not exist, create a new one
          await setDoc(userDocRef, {
            following: {
              [userId]: { username, followedAt: Timestamp.now() }
            }
          }, { merge: true });
          await setDoc(followedUserDocRef, {
            followers: {
              [user.uid]: { username: user.displayName, followedAt: Timestamp.now() }
            }
          }, { merge: true });
          console.log(`User ${username} with id ${userId} followed by ${user.uid}`);
        }
      } catch (error) {
        console.error("Error following user: ", error);
      }
    }
  };

  // Hide the follow button if the userId matches the logged-in user's userId
  if (user?.uid === userId) {
    return null;
  }

  return (
    <Btn onClick={handleFollow} isFollowing={isFollowing}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Btn>
  );
}

export default FollowBtn;
