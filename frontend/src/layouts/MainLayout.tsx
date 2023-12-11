import Footer from "components/navbar/Footer";
import MainContent from "components/navbar/MainContent";
import Sidebar from "components/navbar/Sidebar";
import TopNavbar from "components/navbar/top/TopNavbar";
import { Outlet } from "react-router";


const MainLayout = () => {
    return (
        <div id="app">
            <Sidebar />
            <div id="main" className='layout-navbar navbar-fixed'>
                <TopNavbar />
                <div id="main-content">
                    <div className="page-heading">
                        <section className="section">
                            <Outlet />
                        </section>
                    </div>
                </div>
                <Footer />
            </div>
        </div>

    )
}

export default MainLayout;