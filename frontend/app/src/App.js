import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ArtistListPage from "./components/ArtistListPage/ArtistListPage";
import ChatPage from "./components/ChatPage/ChatPage";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import authReducer from "./store/reducers/authReducer";
import "./App.css";

const rootReducer = combineReducers({
  auth: authReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" render={() => <LandingPage />} exact />
        <Route path="/profile" render={() => <ProfilePage />} exact />
        <Route path="/artists" render={() => <ArtistListPage />} exact />
        <Route path="/chats" render={() => <ChatPage />} exact />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
