import styled, { createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`
  html{overflow: scroll;}
  html,body{height:100%;}
  body {
    opacity: 0.94;
    background: linear-gradient(297deg, #000 50.51%, #606E7B 102.15%);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  #root{
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    
  }
  
`;
export const Wrapper = styled.div`

  position: relative;
`;

export const CircleWrapper = styled.div`

  width: 32.5rem;
  height: 31.25rem;
  margin: 0 auto;
  position: relative;
`;
export const Circle = styled.span`
  position: absolute;

  &:nth-child(1){
    width: 23.5625rem;
    height: 23.5625rem;
    flex-shrink: 0;
    top: -30%;
    left: -11.75rem;
  }
  &:nth-child(2) {
    width: 24.0625rem;
    height: 24.0625rem;
    flex-shrink: 0;
    left: 60%;
    bottom: -12rem;
  }
  &:nth-child(3) {
    width: 11.9375rem;
    height: 11.9375rem;
    flex-shrink: 0;
    /* bottom: 50%;
    transform: translateY(50%);
    right: -100px; */
    bottom: -5.9375rem;
    left: -5.9375rem;

  }
  &:nth-child(4) {
    width: 5.75rem;
    height: 5.75rem;
    flex-shrink: 0;

        bottom: 70%;
    transform: translateY(50%);
    right: -2.875rem;

  }
  &:nth-child(5) {
    width: 3.4375rem;
    height: 3.4375rem;
    flex-shrink: 0;
    top: -1.6875rem;
    right: -1.6875rem;
  }
`

export const Title = styled.h2`
  width: 100%;
  color: white;
  text-align: center;
  color: var(--gray100, #F9F9FA);
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const Form = styled.form`
    background: white;
    display: flex;
    padding: 5.0625rem 6.1875rem;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 19px;
    border: 1px solid rgba(255, 255, 255, 0.64);
    background: linear-gradient(118deg, rgba(255, 255, 255, 0.50) -19.85%, rgba(235, 235, 235, 0.37) 4.2%, rgba(224, 224, 224, 0.29) 13.88%, rgba(212, 212, 212, 0.21) 27.98%, rgba(207, 207, 207, 0.18) 37.8%, rgba(202, 202, 202, 0.14) 44.38%, rgba(200, 200, 200, 0.13) 50.54%, rgba(196, 196, 196, 0.10) 60.21%);
    box-shadow: 0px 1px 24px -1px rgba(0, 0, 0, 0.18);
    backdrop-filter: blur(12px);
    
`;
export const InputWrapper = styled.div`
  width: 20rem;
  height: 3.125rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 8px;
  padding-left: 1rem;
  background: var(--gay200, #ECEEF0);
`;
export const Label = styled.label`
  width: 4.75rem;
  color: var(--gray400, #BDC5CC);
  font-size: .875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
export const Submit = styled.input`
    all:unset;
    display: inline-flex;
    width: 100%;
    padding: 18px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: var(--blue500-primary, #0085FF);
    color: var(--white, #FFF);
    text-align: center;
    font-size: .875rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    box-sizing: border-box;
    cursor: pointer;
    
    &:hover{
      color: #fff;
    }
`;

export const Input = styled.input`
  all:unset;
  font-size: .875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  
  &::placeholder{
    color: var(--gray400, #BDC5CC);
  }
`;


export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  color: #95A1AC;
  font-size: .875rem;
  &:hover a{
    text-decoration:underline;
      color: var(--blue400, #69B9FF);
  }
  a {
    color: #0085FF;
    text-decoration: none;
    margin-left: .25rem;
  }
`;

export const SocialButtonWrapper = styled.div`
  margin-top: 1.25rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;
