import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
const Button = styled.div`
  display: inline-flex;
  width: 323px;
  padding: 12px 15px;
  justify-content: center;
  align-items: center;
  gap: 15px;
  border-radius: 8px;
  background: #050708;
  font-size: 14px;
  cursor: pointer;
  &:hover{color:#fff;}
`;
const LogoWrapper = styled.div`
  width: 20px;
  height: 20px;
  svg{
    width: 100%;
    padding-bottom: 4px;
  }
`
export default function GithubButton(){
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return(
    <Button onClick={onClick}>
      <LogoWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
          <g clipPath="url(#clip0_132_16)">
            <path d="M21.7806 19.2676C21.4327 20.0712 21.021 20.8108 20.544 21.4909C19.8938 22.4179 19.3614 23.0596 18.9511 23.416C18.315 24.0009 17.6336 24.3005 16.9039 24.3175C16.38 24.3175 15.7482 24.1684 15.0128 23.866C14.275 23.5651 13.5969 23.416 12.9769 23.416C12.3267 23.416 11.6293 23.5651 10.8834 23.866C10.1364 24.1684 9.53456 24.326 9.07444 24.3416C8.37466 24.3715 7.67716 24.0634 6.98093 23.416C6.53656 23.0284 5.98075 22.364 5.3149 21.4227C4.60051 20.4176 4.01317 19.252 3.55304 17.9231C3.06026 16.4878 2.81323 15.0979 2.81323 13.7523C2.81323 12.2109 3.1463 10.8815 3.81342 9.76747C4.33772 8.87263 5.03522 8.16675 5.9082 7.64856C6.78118 7.13036 7.72443 6.8663 8.74024 6.8494C9.29605 6.8494 10.0249 7.02133 10.9307 7.35922C11.8339 7.69825 12.4139 7.87018 12.6681 7.87018C12.8582 7.87018 13.5025 7.66914 14.5947 7.26836C15.6275 6.89668 16.4992 6.74278 17.2133 6.80341C19.1484 6.95957 20.6022 7.72238 21.569 9.09666C19.8384 10.1453 18.9823 11.6139 18.9993 13.498C19.015 14.9656 19.5474 16.1868 20.5937 17.1565C21.0679 17.6065 21.5974 17.9544 22.1866 18.2014C22.0588 18.5719 21.9239 18.9269 21.7806 19.2676ZM17.3425 1.80376C17.3425 2.95402 16.9223 4.02802 16.0847 5.0221C15.0738 6.20386 13.8512 6.88674 12.5253 6.77899C12.5084 6.64099 12.4986 6.49575 12.4986 6.34314C12.4986 5.23889 12.9793 4.05712 13.833 3.09087C14.2592 2.60163 14.8013 2.19485 15.4586 1.87034C16.1145 1.55068 16.7349 1.3739 17.3184 1.34363C17.3354 1.4974 17.3425 1.65118 17.3425 1.80374V1.80376Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_132_16">
              <rect width="24" height="24" fill="white" transform="translate(0.5 0.843628)"/>
            </clipPath>
          </defs>
        </svg>
      </LogoWrapper>
      Continue with Github
    </Button>
  );
}
