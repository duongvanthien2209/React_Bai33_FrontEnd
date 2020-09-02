import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

// Providers
import LoginProvider, { LoginContext } from './components/providers/LoginProvider';
import BookProvider from './components/providers/BookProvider';
import BookTypeProvider from './components/providers/BookTypeProvider';

// Layouts
import Default from './components/layouts/Default';
import NoHeader from './components/layouts/NoHeader';

// Pages
import Login from './components/pages/Login/index';
import Register from './components/pages/Register/index';
import Main from './components/pages/Main/index';
import AddBook from './components/pages/AddBook/index';

function App() {
  return (
    <div className="App">
      <Router>
        <LoginProvider>
          <Switch>
            <Route exact path="/login">
              <NoHeader>
                <Login />
              </NoHeader>
            </Route>

            <Route exact path="/register">
              <NoHeader>
                <Register />
              </NoHeader>
            </Route>

            <Route path="/">
              <Default>
                <BookProvider>
                  <BookTypeProvider>
                    <Switch>
                      <Route exact path="/">
                        <Main />
                      </Route>

                      <ProtectedRoute path="/addBook">
                        <AddBook />
                      </ProtectedRoute>
                    </Switch>
                  </BookTypeProvider>
                </BookProvider>
              </Default>
            </Route>
          </Switch>
        </LoginProvider>
      </Router>
    </div>
  );
}

function ProtectedRoute({ children, ...rest }) {
  let { isLogin } = useContext(LoginContext);
  // console.log(isLogin);

  return (
    <Route {...rest} render={() => isLogin ? (children) : (
      <Redirect to={{
        pathname: "/login"
      }} />
    )} />
  );

}

export default App;
