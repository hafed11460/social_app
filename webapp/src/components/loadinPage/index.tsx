import { Spinner } from "react-bootstrap"

const LoadingPage = ()=>{
    return(
        <div className="position-absolute top-50 start-50 translate-middle">
            <Spinner/>
        </div>
    )
}
export default LoadingPage