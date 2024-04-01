import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import PackageItineraries from '../../../components/Admin/Package/PackageItineraries';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import { useAlert } from "react-alert";

export default function PackageToItineraries() {

    const params = useParams();
    const alert = useAlert();
    const [users, setUsers] = useState([{
        key: Date.now(),
        title: "",
        description: "",
        status: 1,

    }])

    const onChangeData = (i, e) => {
        let newusers = [...users];
        newusers[i]['title'] = e.title || '';
        newusers[i]['description'] = e.description || '';
        newusers[i]['status'] = 1;
        setUsers(newusers);
    };

    const addElement = () => {
        setUsers([...users, {
            key: Date.now(),
            title: "",
            description: "",
            status: 1,
        }])
    };

    const removeElement = (i) => {
        let newFormValues = [...users];
        newFormValues.splice(i, 1);
        setUsers(newFormValues)
    };

    const HandleSubmit = () => {

        const data = {
            "iternaries": users
        }

        axios.patch(`${process.env.REACT_APP_BASE_URL}/package/packages/${params.id}/iternaries`, data, {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(res => {
            if (res.data.success === true) {
                alert.success("Data is updated successfully");
                setTimeout(() => {
                    window.location = `/admin/package-to-itineraries/${params.id}`;
                }, 1000);
            } else {
                alert.error("Error")
            }
        });

    }

    function GetDetails(id) {
        axios.get(`${process.env.REACT_APP_BASE_URL}/package/packages/${params.id}/iternaries`, {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(res => {
            if (res.data.success === true) {
                setUsers(res.data.data.iternaries);
            } else {
                alert.error("Error")
            }
        });
    }

    useEffect(() => {
        GetDetails(params.id)
    }, []);

    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <Navbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 hotel">
                    <div className='mt-4'>
                        <h1 className='text-2xl text-black font-bold mb-3'>Package Itinerary</h1>
                    </div>
                    <div className='iternaryForm'>
                        <button type="button" onClick={addElement} className='text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center mb-4'>Add Slot</button>
                        <div className='tabel-responsive'>
                        <table className='table bg-white border border-slate-300 mt-2 indianCategory'>
                            <thead>
                                <tr>
                                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Itinerary Title</th>
                                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Itinerary Description</th>
                                    <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
                                </tr>
                            </thead>
                            <tbody>{users && users?.map((user, index) => (
                                <tr key={user.key}>
                                    <PackageItineraries
                                        key={user.key}
                                        value={user}
                                        onChange={e => onChangeData(index, e)}
                                    />
                                    <td className='border border-slate-300 text-center'>
                                        <button type="button" onClick={() => removeElement(index)} disabled={users.length <= 1} className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>

                        <button type="button" onClick={HandleSubmit} className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
                            Save
                        </button>

                    </div>
                </div>
            </div>

            <FooterAdmin />
        </div>
    )
}
