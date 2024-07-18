import { styled } from "styled-components";
import PostForm from "../components/post-form";
import SubmitBtn from "../components/post-form";
import { useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Timeline from "../components/timeline";

const ModalWrap = styled.div`
  height: 100vh;
  overflow: hidden;
  margin: 0 1.25rem 0 2.5rem;
`;

const StyledTimeline =styled(Timeline)`
    padding-left: 3rem;
`;

const ModalBackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 200vh;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 20%;
  width: 60%;
  padding: 1rem 2rem 1.85rem 2rem;
  background: #E2E6EA;
  border-radius: 10px;
`;

const StyledPostForm =styled(PostForm)`
    height: 15rem;
    width: 100%;
    color: #384048;
    background-color: white;
`;

const StyledSubmitBtn = styled(SubmitBtn)`

`

const CloseBtn = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    svg {
    width: 1.5rem;
    color: #606E7B;
    margin: -.4rem -1.5rem 0 0; 
    cursor: pointer;
    }
`;


export default function modal() {
    const navigate = useNavigate();
    function closeModal() {
      const ok = confirm("Are you sure you stop writing this tweet?");
      if (!ok) return;
      navigate("/"); //url 이동
      }
      useEffect(() => {
        document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
        return () => {
          const scrollY = document.body.style.top;
          document.body.style.cssText = "";
          window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
        };
      }, []);

  return (
    <ModalWrap>
      <StyledTimeline />
        <ModalBackGround onClick={closeModal}/>
          <ModalContainer>
                <CloseBtn onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path></svg>
                </CloseBtn>
                <StyledPostForm>
                  <StyledSubmitBtn/>
                </StyledPostForm>
          </ModalContainer>
    </ModalWrap>
  );
};
