import React from "react";
import { Layout } from "antd";

import Navbar from "../components/Navbar";
// import CollectionList from '../components/CollectionList';

export const CustomLayout = props => {
  const { Header, Content, Footer } = Layout;
  const { isAuthenticated, children } = props;

  return (
    <div>
      {`${process.env.NODE_ENV}`}
      <br />
      {`${process.env.REACT_APP_API_URL}`}
      <Layout className="layout">
        <Header>
          <Navbar isAuth={isAuthenticated} />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div
            style={{
              background: "#fff",
              padding: 24,
              minHeight: 280,
              marginTop: 24
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>LearnIt Early Alpha</Footer>
      </Layout>
    </div>
  );
};

export default CustomLayout;
