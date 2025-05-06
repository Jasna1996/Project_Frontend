import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/user/Footer'
import AdminHeader from '../components/admin/AdminHeader'

function AdminLayout() {
    const location = useLocation();

    const hideHeader = location.pathname === '/admin/login'
    return (
        <div className="flex flex-col min-h-screen">
            {!hideHeader && < AdminHeader />}
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default AdminLayout
