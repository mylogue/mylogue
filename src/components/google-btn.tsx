
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
const Button = styled.div`
  display: inline-flex;
  width: 20.1875rem;
  padding: .75rem .9375rem;
  justify-content: center;
  align-items: center;
  gap: .9375rem;
  border-radius: 8px;
  background: #FFF;
  color: rgba(0, 0, 0, 0.54);
  font-size: .875rem;
  cursor: pointer;
  &:hover{color:#000;}
`;
const LogoWrapper = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  svg{
    width: 100%;
    /* padding-bottom: 4px; */
  }
`
export default function GoogleButton(){
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return(
    <Button onClick={onClick}>
      <LogoWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M17.64 10.0482C17.64 9.41 17.5827 8.79637 17.4764 8.20728H9V11.6886H13.8436C13.635 12.8136 13.0009 13.7668 12.0477 14.405V16.6632H14.9564C16.6582 15.0964 17.64 12.7891 17.64 10.0482Z" fill="#4285F4"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M9 18.8436C11.43 18.8436 13.4673 18.0377 14.9564 16.6631L12.0477 14.405C11.2418 14.945 10.2109 15.264 9 15.264C6.65591 15.264 4.67182 13.6809 3.96409 11.5536H0.957275V13.8854C2.43818 16.8268 5.48182 18.8436 9 18.8436Z" fill="#34A853"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M3.96409 11.5536C3.78409 11.0136 3.68182 10.4368 3.68182 9.84358C3.68182 9.25039 3.78409 8.67358 3.96409 8.13358V5.80176H0.957273C0.347727 7.01676 0 8.3913 0 9.84358C0 11.2958 0.347727 12.6704 0.957273 13.8854L3.96409 11.5536Z" fill="#FBBC05"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M9 4.42317C10.3214 4.42317 11.5077 4.87726 12.4405 5.76908L15.0218 3.18772C13.4632 1.73545 11.4259 0.843628 9 0.843628C5.48182 0.843628 2.43818 2.86045 0.957275 5.80181L3.96409 8.13363C4.67182 6.00636 6.65591 4.42317 9 4.42317Z" fill="#EA4335"/>
        </svg>

      </LogoWrapper>
      Continue with Github
    </Button>
  );
}
