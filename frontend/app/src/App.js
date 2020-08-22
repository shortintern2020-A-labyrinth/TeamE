import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ArtistListPage from "./components/ArtistListPage/ArtistListPage";
import ChatPage from "./components/ChatPage/ChatPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" render={() => <LandingPage />} exact />
      <Route path="/profile" render={() => <ProfilePage />} exact />
      <Route path="/artists" render={() => <ArtistListPage />} exact />
      <Route path="/chats" render={() => <ChatPage />} exact />
    </BrowserRouter>
  );
}

export default App;
