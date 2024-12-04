import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import HomeComeponent from "./component/home-component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeComeponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
