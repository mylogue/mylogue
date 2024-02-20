import { useState } from "react";
import { styled } from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
`;

const TextArea = styled.textarea`
  align-content: center;
  border: none;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 1px 1px 1px #E2E6EA; 
  font-size: 16px;
  color: #384048;
  background-color: white;
  width: 100%;
  max-width: 590px;
  resize: none;
  font-family: 'Noto Sans KR';
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const SubmitBtn = styled.input`
  background-color: #0085FF;
  width: 89px;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 40px;
  font-size: 12px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
    };
  return (
    <Form>
      <TextArea
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="무슨 말을 하고 싶나요?"
      />
      <SubmitBtn
        type="submit"
        value={isLoading ? "Posting..." : "게시하기"}
      />
    </Form>
  );
}