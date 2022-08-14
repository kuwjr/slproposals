import { Layout, message } from 'antd';
import BaseHeader from './BaseHeader';
import BaseFooter from './BaseFooter';
import axios from "../lib/axios";
import { useEffect, useRef, useState, Ref } from 'react';

const { Content } = Layout;

const BaseLayout = ({ children }) => {

    useEffect(() => {
        setUser(typeof(localStorage.getItem('user')) === 'undefined' ? null : JSON.parse(localStorage.getItem('user')))
    }, [])

    const [user, setUser] = useState(null)

    return (
        <Layout>
            <BaseHeader user={ user } />
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    {children}
                </div>
            </Content>
            <BaseFooter />
        </Layout>
    )
}

export default BaseLayout