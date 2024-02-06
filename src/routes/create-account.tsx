import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* 기존 전역 스타일 내용 */

  /* page1에서 body의 배경색을 변경하는 스타일 */
  html,body{height:100%;}
  body {
    opacity: 0.94;
    background: linear-gradient(297deg, #000 50.51%, #606E7B 102.15%);
  }
`;
const Wrapper = styled.div`
  height: 100vh;
  position: relative;
`;

const CircleWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);

`;
const Circle = styled.span`
    position: absolute;
      &:first-child {
    width: 377px;
    height: 377px;
    flex-shrink: 0;
  }
  &:nth-child(2) {
    top: 50%;
    width: 385px;
    height: 385px;
    flex-shrink: 0;
  }
  &:nth-child(3) {
    width: 191px;
    height: 191px;
    flex-shrink: 0;
  }
  &:nth-child(4) {
    width: 92px;
    height: 92px;
    flex-shrink: 0;
  }
  &:nth-child(5) {
    width: 55px;
    height: 55px;
    flex-shrink: 0;
  }
`

const Title = styled.h2`
  color: white;
  text-align: center;
`;

const Form = styled.div`
    background: white;
    display: inline-flex;
    padding: 81px 99px;
    justify-content: center;
    align-items: center;
    gap: 10px;
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
const Input = styled.div``;

export default function CreateAccount() {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <CircleWrapper>
            <Circle>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="377"
                height="377"
                viewBox="0 0 377 377"
                fill="none"
            >
                <g filter="url(#filter0_bi_65_472)">
                <path
                    d="M377 188.5C377 292.606 292.606 377 188.5 377C84.3943 377 0 292.606 0 188.5C0 84.3943 84.3943 0 188.5 0C292.606 0 377 84.3943 377 188.5Z"
                    fill="#384048"
                />
                </g>
                <defs>
                <filter
                    id="filter0_bi_65_472"
                    x="-194.5"
                    y="-194.5"
                    width="766"
                    height="766"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="97.25" />
                    <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_65_472"
                    />
                    <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_65_472"
                    result="shape"
                    />
                    <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="20.95" />
                    <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                    />
                    <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.741176 0 0 0 0 0.772549 0 0 0 0 0.8 0 0 0 1 0"
                    />
                    <feBlend
                    mode="soft-light"
                    in2="shape"
                    result="effect2_innerShadow_65_472"
                    />
                </filter>
                </defs>
            </svg>
            </Circle>
            <Circle>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="385"
                height="385"
                viewBox="0 0 385 385"
                fill="none"
            >
                <g filter="url(#filter0_bi_65_476)">
                <path
                    d="M385 192.5C385 298.815 298.815 385 192.5 385C86.1852 385 0 298.815 0 192.5C0 86.1852 86.1852 0 192.5 0C298.815 0 385 86.1852 385 192.5Z"
                    fill="#384048"
                />
                </g>
                <defs>
                <filter
                    id="filter0_bi_65_476"
                    x="-194.5"
                    y="-194.5"
                    width="774"
                    height="774"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="97.25" />
                    <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_65_476"
                    />
                    <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_65_476"
                    result="shape"
                    />
                    <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="20.95" />
                    <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                    />
                    <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.741176 0 0 0 0 0.772549 0 0 0 0 0.8 0 0 0 1 0"
                    />
                    <feBlend
                    mode="soft-light"
                    in2="shape"
                    result="effect2_innerShadow_65_476"
                    />
                </filter>
                </defs>
            </svg>
            </Circle>
            <Circle>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="191"
                height="191"
                viewBox="0 0 191 191"
                fill="none"
            >
                <g filter="url(#filter0_bi_65_473)">
                <path
                    d="M191 95.5C191 148.243 148.243 191 95.5 191C42.7568 191 0 148.243 0 95.5C0 42.7568 42.7568 0 95.5 0C148.243 0 191 42.7568 191 95.5Z"
                    fill="#95A1AC"
                />
                </g>
                <defs>
                <filter
                    id="filter0_bi_65_473"
                    x="-194.5"
                    y="-194.5"
                    width="580"
                    height="580"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="97.25" />
                    <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_65_473"
                    />
                    <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_65_473"
                    result="shape"
                    />
                    <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="20.95" />
                    <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                    />
                    <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.741176 0 0 0 0 0.772549 0 0 0 0 0.8 0 0 0 1 0"
                    />
                    <feBlend
                    mode="soft-light"
                    in2="shape"
                    result="effect2_innerShadow_65_473"
                    />
                </filter>
                </defs>
            </svg>
            </Circle>
            <Circle>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="92"
                height="92"
                viewBox="0 0 92 92"
                fill="none"
            >
                <g filter="url(#filter0_bi_65_474)">
                <path
                    d="M92 46C92 71.4051 71.4051 92 46 92C20.5949 92 0 71.4051 0 46C0 20.5949 20.5949 0 46 0C71.4051 0 92 20.5949 92 46Z"
                    fill="#606E7B"
                />
                <path
                    d="M91.5 46C91.5 71.129 71.129 91.5 46 91.5C20.871 91.5 0.5 71.129 0.5 46C0.5 20.871 20.871 0.5 46 0.5C71.129 0.5 91.5 20.871 91.5 46Z"
                    
                />
                </g>
                <defs>
                <filter
                    id="filter0_bi_65_474"
                    x="-194.5"
                    y="-194.5"
                    width="481"
                    height="481"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="97.25" />
                    <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_65_474"
                    />
                    <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_65_474"
                    result="shape"
                    />
                    <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="20.95" />
                    <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                    />
                    <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.741176 0 0 0 0 0.772549 0 0 0 0 0.8 0 0 0 1 0"
                    />
                    <feBlend
                    mode="soft-light"
                    in2="shape"
                    result="effect2_innerShadow_65_474"
                    />
                </filter>
                </defs>
            </svg>
            </Circle>
            <Circle>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="55"
                viewBox="0 0 55 55"
                fill="none"
            >
                <g filter="url(#filter0_bi_65_475)">
                <path
                    d="M-3.8147e-06 27.5C-3.8147e-06 42.6878 12.3122 55 27.5 55C42.6878 55 55 42.6878 55 27.5C55 12.3122 42.6878 0 27.5 0C12.3122 0 -3.8147e-06 12.3122 -3.8147e-06 27.5Z"
                    fill="#606E7B"
                />
                <path
                    d="M0.499996 27.5C0.499996 42.4117 12.5883 54.5 27.5 54.5C42.4117 54.5 54.5 42.4117 54.5 27.5C54.5 12.5883 42.4117 0.5 27.5 0.5C12.5883 0.5 0.499996 12.5883 0.499996 27.5Z"
                />
                </g>
                <defs>
                <filter
                    id="filter0_bi_65_475"
                    x="-194.5"
                    y="-194.5"
                    width="444"
                    height="444"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="97.25" />
                    <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_65_475"
                    />
                    <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_65_475"
                    result="shape"
                    />
                    <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="20.95" />
                    <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                    />
                    <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.741176 0 0 0 0 0.772549 0 0 0 0 0.8 0 0 0 1 0"
                    />
                    <feBlend
                    mode="soft-light"
                    in2="shape"
                    result="effect2_innerShadow_65_475"
                    />
                </filter>
                </defs>
            </svg>
            </Circle>
        </CircleWrapper>
        <Form>
          <Title>dsflkjdfsdfsdlk</Title>
          <Input />
          <Input />
          <Input />
          <Input />
          <Input />
        </Form>
      </Wrapper>
    </>
  );
}
