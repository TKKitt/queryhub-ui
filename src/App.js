// React
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Styles
import "./App.css";

// Components
import MyNav from "./components/utility/MyNav";
import Home from "./components/home/Home";
import MyFooter from "./components/utility/MyFooter";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import GoogleRedirect from "./components/auth/GoogleRedirect";
import Profile from "./components/profile/Profile";
import UpdateProfile from "./components/profile/UpdateProfile";
import UpdatePassword from "./components/auth/UpdatePassword";

// Context
import { AuthProvider } from "./contexts/AuthContext";
import { PostProvider } from "./contexts/PostContext";
import ViewPost from "./components/post/ViewPost";
import { AlertProvider } from "./contexts/AlertContext";
import { CommentProvider } from "./contexts/CommentContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <PostProvider>
          <CommentProvider>
            <AlertProvider>
              <Router>
                <MyNav />
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/google-redirect" element={<GoogleRedirect />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/posts/:id" element={<ViewPost />} />
                  <Route path="/update-profile" element={<UpdateProfile />} />
                  <Route path="/update-password" element={<UpdatePassword />} />
                </Routes>
                <MyFooter />
              </Router>
            </AlertProvider>
          </CommentProvider>
        </PostProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
