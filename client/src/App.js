import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OtherPage from "./OtherPage";
import Fib from "./Fib";

function App() {
  return (
    <Router>
      <>
        <Link to="/" style={{ marginRight: "10px" }}>
          Homepage
        </Link>
        <Link to="/otherpage">Otherpage</Link>
        <Route exact path="/" component={Fib} />
        <Route path="/otherpage" component={OtherPage} />
      </>
    </Router>
  );
}

export default App;
