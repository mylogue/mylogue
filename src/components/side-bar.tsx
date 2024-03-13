import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

// Define a common style
const CommonBox = styled.div`
    /* Common styles go here */
    background-color: white;
    padding: 18px;
    border-radius: 8px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
`;
const Wrapper = styled.div`
    display: flex;
    flex-flow: column;
    gap: 30px;
    padding: 25px;
`;
let SearchBox = styled(CommonBox)``;
let SearchWordBox = styled(CommonBox)``;
let FollowBox = styled(CommonBox)``;

SearchBox = styled(SearchBox)`
    input{
        border: none;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    input:focus {outline: none;}
`;
SearchWordBox = styled(SearchBox)`
    flex-flow: column;
`;
FollowBox = styled(SearchBox)`
    
`;
const Title = styled.h3`
    width: 100%;
    color: var(--light-text-color, #222528);
    font-family: "Noto Sans KR";
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 18px;

`;
const Contents = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    gap: 18px;
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
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
    span:last-child{
        color: var(--gray600, #606E7B);

        /* txt-base */
        font-family: "Noto Sans KR";
        font-size: 16px;
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
        width: 60px;
        height: 60px;
        border-radius: 100px;
        margin-right:20px;
    }
    .nickname{
        color: var(--light-text-color, #222528);
        font-family: "Noto Sans KR";
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
    .id{
        color: var(--gray600, #606E7B);
        font-family: "Noto Sans KR";
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-left: 20px;
    }
`;
const TermsOfService = styled.div`
    margin: 0 8px;
    color: var(--gray700, #384048);
    font-family: "Noto Sans KR";
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: flex;
    flex-flow: column;
    gap: 8px;
    width: 100%;
    a{
        text-decoration:none;
        color: #384048;
    }
`;
const StyledIcon = styled(FontAwesomeIcon)`
    width: 20px;
    height: 20px;
    margin-right: 10px;
`;

function SideBar() {
    const numPosts = 7;
    const numNickName = 4;
    const postsArray = Array.from({ length: numPosts }, (_, index) => index);
    const NickNameArray = Array.from({ length: numNickName }, (_, index) => index);
    
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
                <FollowBox>
                    <Title>팔로우 추천</Title>
                    <Contents>
                        {NickNameArray.map((index) => (
                            <NickName>
                                <img src={`../../public/profile${index+1}.png`} alt="" className="profileImg"/>
                                <span className="nickname">닉네임</span>
                                <span className="id">@아이디</span>
                            </NickName>
                        ))}
                    </Contents>
                </FollowBox>
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