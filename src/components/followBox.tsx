import styled from "styled-components";


const Title = styled.h3`
  width: 100%;
  color: var(--light-text-color, #222528);
  font-family: "Noto Sans KR";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 1.125rem;
  cursor: pointer;
  background: white;
  border-radius: 8px;
  box-shadow: .0625rem .0625rem .0625rem #E2E6EA;
  padding: 1.125rem;
`;

const LayoutBox = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: .75rem;
  .profileImg {
    background: white;
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 6.25rem;
    margin-right: 1.25rem;
    object-fit:cover;
  }
  .nickname {
    color: var(--light-text-color, #222528);
    font-family: "Noto Sans KR";
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .id {
    color: var(--gray600, #606e7b);
    font-family: "Noto Sans KR";
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-left: 1.25rem;
  }
`;
const UserBox = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
`;

const FollowBox: React.FC = ({userInfo}) => {
  
  return (
    <>
      <Contents>
      <Title>팔로우 추천</Title>
        <LayoutBox>
            {userInfo.map((user,index)=>(
                <UserBox key={index}>
                    <img src={user.userProfile} alt="image" className="profileImg" />
                    <span className="nickname">{user.username}</span>
                    <span className="id">@{user.id.substring(0,8)}</span>
                </UserBox>
            ))}
        </LayoutBox>

      </Contents>
    </>
  );
};

export default FollowBox;
