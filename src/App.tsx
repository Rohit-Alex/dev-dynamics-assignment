import { Route, Routes } from "react-router-dom";
import "./global.scss";
import Layout from "./Layout";
import Dashboard from "components/Dashboard";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<h4>Page not found</h4>} />
      </Routes>
    </Layout>
  );
}

export default App;
