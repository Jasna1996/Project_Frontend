import React      from 'react'
import Header     from '../components/user/Header'
import Footer     from '../components/user/Footer';
import { Outlet } from "react-router-dom";
 

function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default UserLayout
