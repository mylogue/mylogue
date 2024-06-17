import { useState } from "react";
import { styled } from "styled-components";
import { auth, db} from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; 

const Wrapper = styled.div`
    position: relative;
`;
const Form = styled.form`
    padding: 1.25rem;
    border-radius: 8px;
    box-shadow: 1px 1px 1px #E2E6EA; 
    font-size: 1rem;
    color: #384048;
    background-color: white;
    width: 100%;
    height: 8.75rem;
`;

const UserPic = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 100px;
    background: #0085FF;
    cursor: pointer;
`;

const AvatarImg = styled.img`
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 100px;
    position: absolute;
    object-fit: cover;
    cursor: pointer;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 65%;
    padding: .9375rem 0 0 4.375rem;
    margin-bottom: 2.5rem;
    border: none;
    resize: none;
    font-family: 'Noto Sans KR';
    &::-webkit-scrollbar {
        background: white;
      }
    &::-webkit-scrollbar-thumb{
    background: #F0F4F8;
    border-radius: 10px;
    }
    &::placeholder {
        font-size: 1rem;
        color: #384048;
    }
    &:focus {
        outline: none;
        border-color: #1d9bf0;
    }
`;

const TextBottom = styled.div`
    position: absolute;
    bottom: 1rem;
    right: 1rem;
`;

const IconBtn = styled.div`
    float: left;
    padding-top: .3125rem;
    svg {
        width: 1.5625rem;
        color: #0085FF;
        float: left;
        margin-right: .3125rem;
        cursor: pointer;
    }
`;

const SubmitBtn = styled.input`
    float: left;
    background-color: #0085FF;
    width: 5.5625rem;
    color: white;
    border: none;
    padding: .625rem 0rem;
    border-radius: 40px;
    font-size: .75rem;
    cursor: pointer;
    &:hover,
    &:active {
        opacity: 0.9;
    }
`;

export default function PostForm() {
  const [isLoading,setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const user = auth.currentUser;
  const [userProfile] = useState(user?.photoURL);
  const navigate = useNavigate(); // Initialize navigate function

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
    };
   
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || isLoading || tweet === "" || tweet.length > 180) return;
        try {
            setLoading(true);
            await addDoc(collection(db, "tweets"), {
            tweet,
            createdAt: Date.now(),
            username: user?.displayName || "Anonymous",
            userId: user?.uid,
            userProfile:user?.photoURL
            });
        setLoading(false); // Move setLoading to after the tweet is added to the database
            // Close modal and navigate to home
        
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    function closeModal(){
		setTimeout(() => {
			navigate("/");
		}, 2000);
    };
  return (
    <Wrapper>
        <Form onSubmit={onSubmit}>
            <UserPic>
                 {userProfile ? (
                        <AvatarImg src={userProfile}/>
                    ) : (
                        <AvatarImg src="../public/profileImg.png"/>
                )}
            </UserPic>
            <TextArea
                rows={5}
                maxLength={180}
                onChange={onChange}
                value={tweet}
                placeholder="무슨 말을 하고 싶나요?"
            />
            <TextBottom>
                <IconBtn>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                    </svg>
                </IconBtn>
                <SubmitBtn
                type="submit"
                value={isLoading ? "Posting..." : "게시하기"}
                onClick={closeModal}
                />
            </TextBottom>
        </Form>
    </Wrapper>
  );
}