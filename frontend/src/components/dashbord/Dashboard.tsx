import EmployeeSelect from "components/employees/EmployeeSelect"
import { useState } from "react"



const Dashboard = () => {

    const [montCells] = useState<number[]>(Array.from({ length: 3 }, (value, index) => index + 1))
    return (
        <div className="page-content container">
            <EmployeeSelect/>
            <section className="row">
                <div className="col-12 col-lg-12">
                    <div className="row">
                        <div className="col-6 col-lg-3 col-md-6">
                            <div className="card">
                                <div className="card-body px-4 py-4-5">
                                    <div className="row">
                                        <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                            <div className="stats-icon purple mb-2">
                                                <i className="iconly-boldShow"></i>
                                            </div>
                                        </div>
                                        <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                            <h6 className="text-muted font-semibold">Faclilies</h6>
                                            <h6 className="font-extrabold mb-0">250</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3 col-md-6">
                            <div className="card">
                                <div className="card-body px-4 py-4-5">
                                    <div className="row">
                                        <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                            <div className="stats-icon blue mb-2">
                                                <i className="iconly-boldProfile"></i>
                                            </div>
                                        </div>
                                        <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                            <h6 className="text-muted font-semibold">Primes</h6>
                                            <h6 className="font-extrabold mb-0">320</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3 col-md-6">
                            <div className="card">
                                <div className="card-body px-4 py-4-5">
                                    <div className="row">
                                        <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                            <div className="stats-icon green mb-2">
                                                <i className="iconly-boldAdd-User"></i>
                                            </div>
                                        </div>
                                        <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                            <h6 className="text-muted font-semibold">Employees</h6>
                                            <h6 className="font-extrabold mb-0">2555</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3 col-md-6">
                            <div className="card">
                                <div className="card-body px-4 py-4-5">
                                    <div className="row">
                                        <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                            <div className="stats-icon red mb-2">
                                                <i className="iconly-boldBookmark"></i>
                                            </div>
                                        </div>
                                        <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                            <h6 className="text-muted font-semibold">Saved Post</h6>
                                            <h6 className="font-extrabold mb-0">112</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Profile Visit</h4>
                                </div>
                                <div className="card-body">
                                    <div id="chart-profile-visit"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Dashboard