import './App.css';
import { Route, useLocation } from "react-router-dom";
import { Home, Landing, Detail, Form } from "./views"
import NavBar from "./components/NavBar/NavBar";
import axios from 'axios';
axios.defaults.baseURL = "https://pi-countries-production-47ab.up.railway.app/";
function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar/>}
      <Route exact path="/" component={Landing} />
      <Route exact path="/countries/:idPais" component={Detail} />
      <Route exact path="/activities" component={Form} />
      <Route exact path="/home" render={() => <Home />}></Route>
    </div>
  );
}
export default App;
