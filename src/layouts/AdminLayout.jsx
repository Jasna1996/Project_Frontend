import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/user/Footer'
import AdminHeader from '../components/admin/AdminHeader'

function AdminLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            < AdminHeader />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default AdminLayout
