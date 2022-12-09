import React, { useState, useEffect } from 'react';
import axios from 'axios';

//components
import CandCard from "../../components/CandidateCard/CandidateCard"


import "./styles/MainSection.css"

function App() {

    const [userDetail, setUserDetail] = useState();

    useEffect(() => {
        axios
            .get('http://localhost:8000/admin')
            .then((res) => {
                setUserDetail(res.data)
            })
    }, [null])

    const [count, setCount] = useState(0);

    useEffect(() => {
        axios
            .get('http://localhost:8000/count')
            .then((res) => {
                // setUserDetail(res.data)
                // console.log(res.data[0].count);
                setCount(res.data[0].count)
            })
    }, [null])

    // console.log(userDetail);

    return (
        <>
            <div className='dashboard'>

                <div className='status-board'>
                    <div>
                        Pending Resumes : {count}
                    </div>
                    <div>
                        Reviewed Resumes : {userDetail?.data.length - count}
                    </div>
                </div>

                <div className='candidates-info'>

                    <h2>Pending Candidates</h2>
                    <div className='pending-candidates'>

                        {
                            userDetail?.data.map((detail) => {
                                {/* console.log(detail); */ }
                                if (detail.status === 'Pending') {
                                    {/* console.log(detail.fileLocation); */ }
                                    return <CandCard id={detail.applId} name={detail.fName + " " + detail.lName} note={detail.message} email={detail.email} phone={detail.phone} status={detail.status} fileName={detail.fileName} />
                                }
                            })
                        }


                    </div>

                    <h2>Reviewed Candidates</h2>
                    <div className='reviewed-candidates'>
                        {
                            userDetail?.data.map((detail) => {
                                {/* console.log(detail); */ }
                                if (detail.status === 'Reviewed') {
                                    return <CandCard name={detail.fName + " " + detail.lName} note={detail.message} email={detail.email} phone={detail.phone} fileName={detail.fileName} />
                                }
                            })
                        }


                    </div>
                </div>
            </div>
        </>
    );
}

export default App;