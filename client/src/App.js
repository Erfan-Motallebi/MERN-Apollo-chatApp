// FILES:
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import MenuBar from "./components/layouts/MenuBar";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";
import { AuthProvider } from "./components/utils/context/context";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RouteAuthCheck from "./components/utils/RouteAuthCheck";
import SinglePost from "./components/SinglePost";

function App() {
  return (
    <AuthProvider>
      <Container>
        <Router>
          <MenuBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <RouteAuthCheck exact={true} path="/login" component={Login} />
            <RouteAuthCheck
              exact={true}
              path="/register"
              component={Register}
            />
            <Route exact path="/posts/:id" component={SinglePost} />
          </Switch>
        </Router>
      </Container>
    </AuthProvider>
  );
}

export default App;
