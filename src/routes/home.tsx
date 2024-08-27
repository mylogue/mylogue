import { styled } from "styled-components";
import PostForm from "../components/post-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
  display: grid;
  padding: 1.5625rem 1.25rem 0 2.5rem;
  overflow-y: scroll;
  
  &::-webkit-scrollbar {
    background: #F0F4F8;
  }
  @media (max-width: 1080px) {
    /* width:calc(100vw - 354px) */
  }
  @media (max-width: 767px) {
    width:100%;
    overflow-y: visible;
    padding: 20px 0 0 0;
    /* padding: 1rem; */
  }
`;

export default function Home() {
  return (
    <Wrapper>
      <PostForm />
      <Timeline />
    </Wrapper>
  );
}