import { styled } from "styled-components";
import PostForm from "../components/post-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
  display: grid;
  padding: 25px 20px 0 40px;
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