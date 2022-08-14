import { Layout, Menu, message } from "antd"
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from "react-router-dom";
const { Header } = Layout;

const BaseHeader = ({user}) => {
    
    const navigate = useNavigate()
    const location = useLocation()

    const menu_items = [
        {
            key: 1, label: 'All Proposals', route: `/`, onClick: () => { navigate("/") }
        },
        {
            key: 2, label: 'About', route: `/about`, onClick: () => { navigate("/about") }
        },
        {
            key: 3, label: 'Contact', route: `/contact`, onClick: () => { navigate("/contact") }
        },
        {
            key: 4, label: 'Login', route: `/login`, onClick: () => { navigate("/login") }
        },
        {
            key: 5, label: 'Register', route: `/register`, onClick: () => { navigate("/register") }
        },
    ]

    const authenticated_menu = [
        {
            key: 1, label: 'All Proposals', route: `/`, onClick: () => { navigate("/") }
        },
        {
            key: 2, label: 'My Account', route: `/my-account`, onClick: () => { navigate("/my-account") }
        },
        {
            key: 3, label: 'About', route: `/about`, onClick: () => { navigate("/about") }
        },
        {
            key: 4, label: 'Contact', route: `/contact`, onClick: () => { navigate("/contact") }
        },
        {
            key: 5, label: 'Log Out', onClick: () => { localStorage.setItem('user', null); navigate("/login") }
        },
    ]





  

    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo">
            </div>
            {user ? 
            <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            selectedKeys={authenticated_menu.filter(i => i.key === location.pathname)}
            items={authenticated_menu}
            />
        :    <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        selectedKeys={menu_items.filter(i => i.key === location.pathname)}
        items={menu_items}
        />}
        </Header>
    )
}

export default BaseHeader