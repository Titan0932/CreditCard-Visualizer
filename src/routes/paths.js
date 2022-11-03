import { Routes, Route } from "react-router-dom";
import { Main } from "../components/Main";
import { Layout } from "../components/layout";

export const RoutePaths = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Layout>
  );
};
