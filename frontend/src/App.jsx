import React, { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import { useAppStore } from "./store";
import apiclient from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants.js";

// TILL I DONE JWT VERIFICATION userInfo ONLY CONTAINS THE EMAIL AND USER ID NOT ANYTHING ELSE
// THIS FUNCTION IS RESPONSIBLE FOR GIVING ACCESS TO THE CHAT AND PROFILE PAGE OF OUR SITE IF USER DONT HAVE TOKEN OR DONT AUTHENTICATED WITH US
const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore(); // in chat page or profile page if we need info of user from before like from auth we can get with this
  const isAuthenticated = !!userInfo;  // iss line ne bc 2-3 ghante kharab kiye MKC !! iski
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

// THIS FUNCTION IS RESPONSIBLE FOR DIRECT ROUTING OF THE PAGE FROM LOGIN TO CHAT SCREEN IF WE JWT TOKEN
const AuthRoute = ({ children }) => {
  // we are checking if we have the user info than we will directly navigate user to chat page from auth
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

const App = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        // Calling userinfo API
        const response = await apiclient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
        }
      } catch (error) {
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    // Fetch user data only if userInfo is not yet set
    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false); // Stop loading if userInfo is already set
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth"
            element={
              <AuthRoute>
                <Auth />
              </AuthRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/auth" />} />
          {/* If the user type in the route that's not described in the code ,
           then this * will work , if i do this element={<Auth />} it will
           still work and show the auth component but the url does not changes ,
           for that i will use navigate */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
