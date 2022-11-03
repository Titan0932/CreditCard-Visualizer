import { RoutePaths } from "./routes/paths";
import { BrowserRouter } from "react-router-dom";
import { Main } from "./components/Main";

function App() {
  return (
    // <Main />
    <BrowserRouter>
      <RoutePaths />
    </BrowserRouter>
  );
}

export default App;
