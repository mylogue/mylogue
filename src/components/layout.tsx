import {Link, Outlet, useNavigate} from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../firebase";
import SideBar from "./side-bar";
import { useState } from "react";
import Modal from "../components/modal";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 55% 1fr;
  height: 100%;
  width: 100%;
`;
interface SideMenuProps {
    isOpen: boolean;
  }
  
const SideMenu = styled.div<SideMenuProps>`
color: ${({ isOpen }) => (isOpen ? '#0085FF' : '#777')};
transition: color 0.3s ease;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 3.75rem 1.875rem 0 5.875rem; 
    background: white;
    `;

const MenuItem = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 4rem;
    width: 100%;
    max-width: 20.625rem;
    padding: 1.25rem; 
    color: black;
    svg {
      width: 1.875rem;
    }
    &.log-out {
        color: tomato;
      }
    &.writeBtn {
        color: white;
        background: #0085FF;
        border-radius: 40px;
    }
    /* &:hover{
        color: #0085FF;
    } */
    &.active{
        color: #0085FF;
    }
    &:not(.writeBtn):hover{
      color  : #0085FF;
    }
  `;

const ItemName = styled.div`
    font-size: 1.1rem;
    padding-left: 1.25rem;
    font-weight: bold;

`;

const Timeline = styled.div`
    height: 100%;
    width: 100%;
    `;



export default function Layout() {
    const navigate = useNavigate();
    const onLogOut = async () => {
        const ok = confirm("Are you sure you want to log out?");
        if (ok) {
        await auth.signOut();
        navigate("/login");
        }
    };
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    const toggleSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    };

    const handleItemClick = (index: number) => {
        setActiveIndex(index);
        toggleSideMenu(); // 메뉴 클릭시 사이드 메뉴를 닫습니다.

    
    const [writeModal,setwriteModal] = useState(false); 
    const [ModalClicked, setModalClicked] = useState(false);
    const Modal = () => {
        if (writeModal) {
        setwriteModal(false);
        }
      
        // Toggle the commentClicked state
        setModalClicked(!ModalClicked);
      
        // Open the modal when clicking comment for the first time
        if (!ModalClicked) {
        setwriteModal(true);
        }
      };
    return (
        <Wrapper>
            <Menu>
                <SideMenu isOpen={isSideMenuOpen}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <MenuItem className={activeIndex === 0 ? "active" : ""}
                onClick={() => handleItemClick(0)}>
                            <ItemName style={{ color: "#0085FF" , padding: "0px", fontSize: "1.5rem"}}>Mylogue</ItemName>
                        </MenuItem>
                    </Link>
                    
                </SideMenu>
                <SideMenu isOpen={isSideMenuOpen}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <MenuItem className={activeIndex === 1 ? "active" : ""}
                onClick={() => handleItemClick(1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            <ItemName>홈</ItemName>
                        </MenuItem>  
                    </Link>
                </SideMenu>
                <SideMenu isOpen={isSideMenuOpen}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <MenuItem className={activeIndex === 2 ? "active" : ""}
                onClick={() => handleItemClick(2)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <ItemName>검색하기</ItemName>
                        </MenuItem>  
                    </Link>
                </SideMenu>
                <SideMenu isOpen={isSideMenuOpen}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <MenuItem className={activeIndex === 3 ? "active" : ""}
                onClick={() => handleItemClick(3)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg>
                            <ItemName>알림</ItemName>
                        </MenuItem>  
                    </Link>
                </SideMenu>
                <SideMenu isOpen={isSideMenuOpen}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <MenuItem className={activeIndex === 4 ? "active" : ""}
                onClick={() => handleItemClick(4)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            <ItemName>쪽지</ItemName>
                        </MenuItem>  
                    </Link>
                </SideMenu>
                <SideMenu isOpen={isSideMenuOpen}>
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                        <MenuItem  className={activeIndex === 5 ? "active" : ""}
                onClick={() => handleItemClick(5)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            <ItemName>프로필</ItemName>
                        </MenuItem>  
                    </Link>
                </SideMenu>
                <SideMenu isOpen={isSideMenuOpen}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <MenuItem className={activeIndex === 6 ? "active" : ""}
                onClick={() => handleItemClick(6)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <ItemName>설정</ItemName>
                        </MenuItem>  
                    </Link>
                </SideMenu>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <MenuItem className="writeBtn" style={{ width: "210px" }} onClick={Modal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                        <ItemName>게시하기</ItemName>
                    </MenuItem>  
                </Link>
                    <MenuItem onClick={onLogOut} className="log-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                        <ItemName>로그아웃</ItemName>
                    </MenuItem>  
            </Menu>
            <Timeline>
                <Outlet/>
            </Timeline>
            <SideBar />
        </Wrapper>
        )
    }
};