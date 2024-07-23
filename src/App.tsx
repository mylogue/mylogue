import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import './App.css';
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import ProtectedRoute from "./routes/protected-route";
import Modal from "./routes/modal";
import Bookmarked from "./routes/bookmarked";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "modal",
        element: <Modal />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "bookmarked",
        element: <Bookmarked />,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }, {
    path: "/create-account",
    element: <CreateAccount />
  }
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-size: 16px;
    background-color: #F0F4F8;
    color: #384048;
    font-family: 'Noto Sans KR', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        // 업데이트할 프로필 정보
        const profileData = {
          username: user.displayName, // 기본 사용자 이름 설정
          userId: user.uid,
          userprofile: user.photoURL
        };
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          UserInfo: profileData
        }, { merge: true });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
        <GlobalStyles />
        {isLoading ? <LoadingScreen /> :  <RouterProvider router={router} />}
        
    </>
  )
}

export default App;
