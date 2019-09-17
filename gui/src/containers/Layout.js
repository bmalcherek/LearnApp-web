import React, { Component } from 'react';
import { Layout } from 'antd';

import Navbar from '../components/Navbar';
// import CollectionList from '../components/CollectionList';

const { Header, Content, Footer } = Layout;

export class CustomLayout extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
        };
    }
    render() {
        return (
            <div>
                {`${process.env.NODE_ENV}`}
                <br />
                {`${process.env.REACT_APP_API_URL}`}
                <Layout className="layout">
                    <Header>
                        <Navbar isAuth={this.props.isAuthenticated} />
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <div style={{ background: '#fff', padding: 24, minHeight: 280, marginTop: 24 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>LearnIt Early Alpha</Footer>
                </Layout>
            </div>
        );
    }
}

export default CustomLayout;
