// @ts-ignore
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Trending from "./pages/Trending/Trending";
import Search from "./pages/Search/Search";
import { Container } from "@material-ui/core";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
          <Container className="container">
            <Switch>
              <Route path="/" component={Trending} exact />
              <Route path="/movies" component={Movies} />
              <Route path="/series" component={Series} />
              <Route path="/search" component={Search} />
            </Switch>
          </Container>
      </BrowserRouter>
    </div>
    
  );
}

export default App;