import {Link, Outlet} from "react-router-dom";
import { styled } from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 46% 1fr;
  height: 100%;
  width: 100%;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    `;

const MenuItem = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 74px;
    width: 100%;
    svg {
      width: 30px;
      fill: black;
    }
  `;

const Timeline = styled.div`
    height: 100%;
    width: 100%;
    `;

const Sidebar = styled.div`
    height: 100%;
    width: 100%;
    `;

export default function Layout() {
    return (
        <Wrapper>
            <Menu>
                <h2>메뉴바</h2>
                <h3>마이로그 로고</h3>
                <Link to="/">
                    <MenuItem>
                        <svg></svg>
                    </MenuItem>  
                </Link>
            </Menu>
            <Timeline>
            <h2>타임라인</h2>
            <Outlet/>
            </Timeline>
            <Sidebar>
            <h2>사이드바</h2>
            </Sidebar>
        </Wrapper>
    )
}