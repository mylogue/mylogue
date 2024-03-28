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
`;

export default function Home() {
  return (
    <Wrapper>
      <PostForm />
      <Timeline />
    </Wrapper>
  );
}