import { collectionGroup, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled, {css} from "styled-components";
import { auth, db } from "../firebase";
import { updateProfile } from "firebase/auth";

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

function FollowBtn({userId, id }) {
    const [followUser, setFollowUser] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false); // 팔로우 상태 여부를 나타내는 상태 추가
    const user = auth.currentUser;
    console.log(user)
    useEffect(() => {
        const fetchFollowUser = async () => {
            try {
                const tweetDocRef = doc(db, 'tweets', id);
                const tweetDocSnapshot = await getDoc(tweetDocRef);
                const existingFollowList = tweetDocSnapshot.data()?.followList || [];
                setFollowUser(existingFollowList);
                setIsFollowing(existingFollowList.some(user => user.userId !== userId));
            } catch (error) {
                console.error('팔로우 데이터를 가져오는 중 오류 발생:', error);
            }
        };

        fetchFollowUser();
    }, [id, userId]);

    const followButtonClickHandler = async () => {
        try {
            // 이미 팔로우한 경우 팔로잉 취소
            if (isFollowing) {
                const ok = window.confirm("팔로잉을 취소하시겠습니까?");
                if (!ok) return;
                // FollowUser 배열에서 해당 유저를 제외한 배열을 생성하여 업데이트
                const updatedFollowUser = followUser.filter(user => user.userId === userId);
                const tweetDocRef = doc(db, 'tweets', id);
                await updateDoc(tweetDocRef, {
                    followList: updatedFollowUser,
                });
                setFollowUser(updatedFollowUser);
                setIsFollowing(false);
                alert('팔로우가 취소되었습니다.');
            } else {
                // 새로운 팔로우 추가
                const tweetDocRef = doc(db, 'tweets', id);
                const existingComments = (await getDoc(tweetDocRef)).data()?.followList || [];
                const FollowUser = {
                    userId: user?.uid,
                    username: user?.displayName,
                    userProfile: user?.photoURL
                };
                const updatedFollowUser = [...existingComments, FollowUser];
                await updateDoc(tweetDocRef, {
                    followList: updatedFollowUser,
                });
                setFollowUser(updatedFollowUser);
                setIsFollowing(true);
                alert('팔로우 되었습니다!');
                await updateProfile(user,{
                    followList:updatedFollowUser,
                })
            }
        } catch (error) {
            console.error('팔로우 중 오류 발생:', error);
            alert('팔로우 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <Btn onClick={followButtonClickHandler} following={isFollowing}>
            {isFollowing ? '팔로잉' : '팔로우'}
        </Btn>
    );
}

export default FollowBtn;
