import { styled } from "styled-components";
import PostForm from "../components/post-form";

const ModalWrap = styled.div`
  width: 100vw;
  height: 100vh;
`;

const ModalBackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100vh;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 20%;
  width: 60%;
  heigt: 10rem;
  background: black;
`;

export default function () {

  return (
    <ModalWrap>
        <ModalBackGround/>
        <ModalContainer>
            <PostForm/>
        </ModalContainer>
    </ModalWrap>
  );
};
