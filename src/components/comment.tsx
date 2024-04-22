import styled from "styled-components";

const CommentComponent = styled.div`
  background-color  : #fff;
  stroke: 1px solid black/0.5;
`;


function CommentContent() {
    return ( <>
        <CommentComponent>
            
            코멘트입닠다.
        </CommentComponent>
    </> );
}

export default CommentContent;