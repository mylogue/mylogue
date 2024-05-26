import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import FollowBox from './followBox';
import { useEffect, useState } from "react";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
// Define a common style
const CommonBox = styled.div`
    /* Common styles go here */
    background-color: white;
    padding: 1.125rem;
    border-radius: 8px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
`;
const Wrapper = styled.div`
    display: flex;
    flex-flow: column;
    gap: 1.875rem;
    padding: 1.5625rem;
`;
let SearchBox = styled(CommonBox)``;
let SearchWordBox = styled(CommonBox)``;

SearchBox = styled(SearchBox)`
    input{
        border: none;
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    input:focus {outline: none;}
`;
SearchWordBox = styled(SearchBox)`
    flex-flow: column;
`;

const Title = styled.h3`
    width: 100%;
    color: var(--light-text-color, #222528);
    font-family: "Noto Sans KR";
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 1.125rem;

`;
const Contents = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    gap: 1.125rem;
    cursor: pointer;
    
`;

const Post = styled.a`
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    span:first-child{
        color: var(--light-text-color, #222528);
        /* tit-base */
        font-family: "Noto Sans KR";
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
    span:last-child{
        color: var(--gray600, #606E7B);

        /* txt-base */
        font-family: "Noto Sans KR";
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
`;

const NickName = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;
    .profileImg{
        background: white;
        width: 3.75rem;
        height: 3.75rem;
        border-radius: 6.25rem;
        margin-right:1.25rem;
    }
    .nickname{
        color: var(--light-text-color, #222528);
        font-family: "Noto Sans KR";
        font-size: 1.125rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
    .id{
        color: var(--gray600, #606E7B);
        font-family: "Noto Sans KR";
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-left: 1.25rem;
    }
`;
const TermsOfService = styled.div`
    margin: 0 .5rem;
    color: var(--gray700, #384048);
    font-family: "Noto Sans KR";
    font-size: .75rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: flex;
    flex-flow: column;
    gap: .5rem;
    width: 100%;
    a{
        text-decoration:none;
        color: #384048;
    }
`;
const StyledIcon = styled(FontAwesomeIcon)`
    width: 1.25rem;
    height: 1.25rem;
    margin-right: .625rem;
`;

function SideBar() {
    const numPosts = 7;
    const postsArray = Array.from({ length: numPosts }, (_, index) => index);
    
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

    const uniqueNames = [...new Set(tweets.map(user => user.username))];

    // 결과 생성
    const userInfo = uniqueNames.map(username => {
        const userWithSameName = tweets.find(user => user.username === username);
        return {username: username, id: userWithSameName.userId , userProfile: userWithSameName.userProfile};
    });

    return ( <>
            <Wrapper>
                <SearchBox>
                     <StyledIcon icon={faMagnifyingGlass} />
                    <input type="text" placeholder="검색하기" />
                </SearchBox>
                <SearchWordBox>
                    <Title>인기 급상승 검색어</Title>
                    <Contents>
                        {postsArray.map((index) => (
                            <Post key={index}>
                                <span>복권당첨</span>
                                <span>17,596 posts</span>
                            </Post>
                        ))}
                    </Contents>
                </SearchWordBox>
                <FollowBox userInfo={userInfo}/>
                <TermsOfService>
                    <div>
                        <span>이용약관</span>
                        <span>개인정보 처리방침</span>
                        <span>쿠키 정책</span>
                        <span>접근성</span>
                        <span>광고 정보</span>
                    </div>
                    <div>
                        <a href="#">더보기...</a>
                        <span>@2023 Mylogue Corp.</span>
                    </div>
                </TermsOfService>
            </Wrapper>
    </> );
}

export default SideBar;