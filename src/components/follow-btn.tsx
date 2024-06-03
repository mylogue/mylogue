import { Timestamp, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";

interface FollowButtonProps {
  followerId: string;
  followingId: string;
}

  const Btn = styled.button`
    background: #0085FF;
    color: white;
    border: none;
    border-radius: 30px;
    width: 5.5625rem;
    font-size: .75rem;
    cursor: pointer;
    display: inline-flex;
    padding: 12px 2px;
    height: fit-content;
    justify-content: center;
    margin-left: auto;
  `;
  
  const addFollow = async (followerId: string, followingId: string): Promise<void> => {
 
    console.log(user)
    const follow = {
      followerId,
      followingId,
      timestamp: Timestamp.now(),
    };
  
    try {
      await addDoc(collection(db, 'follows'), follow);
      console.log('Follow added successfully');
    } catch (error) {
      console.error('Error adding follow: ', error);
    }
  };
  
  
  const FollowBtn: React.FC<FollowButtonProps> = ({ followerId, followingId }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const user = auth.currentUser;
    console.log(user)
    useEffect(() => {
      console.log('followerId:', followerId);
      console.log('followingId:', followingId);
      
      if (!followerId || !followingId) {
        console.error('followerId or followingId is undefined');
        return;
      }
  
      const fetchFollowStatus = async () => {
        try {
          const followsQuery = query(
            collection(db, 'follows'),
            where('followerId', '==', followerId),
            where('followingId', '==', followingId)
          );
          const querySnapshot = await getDocs(followsQuery);
  
          if (!querySnapshot.empty) {
            setIsFollowing(true);
          } else {
            setIsFollowing(false);
          }
        } catch (error) {
          console.error('Error fetching follow data:', error);
        }
      };
  
      fetchFollowStatus();
    }, [followerId, followingId]);
  
    const handleFollow = async () => {
      if (!followerId || !followingId) {
        console.error('followerId or followingId is undefined');
        return;
      }
  
      if (isFollowing) {
        console.log('Already following');
        return;
      }
      await addFollow(followerId, followingId);
      setIsFollowing(true);
    };
 

    return (
        <Btn onClick={handleFollow}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Btn>
    );
}

export default FollowBtn;
