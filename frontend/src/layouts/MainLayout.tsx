import Footer from "components/navbar/Footer";
import MainContent from "components/navbar/MainContent";
import Sidebar from "components/navbar/Sidebar";
import TopNavbar from "components/navbar/top/TopNavbar";


const MainLayout = () => {
    return (
        <div id="app">
            <Sidebar />
            <div id="main" className='layout-navbar navbar-fixed'>
                <TopNavbar/>
                <MainContent/>
                <Footer/>
            </div>
        </div>
       
    )
}

export default MainLayout;