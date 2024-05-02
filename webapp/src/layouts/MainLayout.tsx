import MainNavbar from "components/navbar/MainNavbar";
import { Outlet } from "react-router";


const MainLayout = () => {
    return (
        <>
            <div id="app">
                {/* <Sidebar /> */}
                <div id="main" className='layout-horizontal layout-navbar navbar-fixed'>
                    <MainNavbar />
                    {/* <TopNavbar /> */}
                    <div id="main-content">
                        <div className="page-heading">
                            <section className="section">
                                <Outlet />
                            </section>
                        </div>
                    </div>
                    {/* <Footer /> */}
                </div>
            </div>
        </>

    )
}

export default MainLayout;