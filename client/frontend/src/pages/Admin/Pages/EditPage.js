import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import Navbar from '../../../components/Admin/Navbar/AdminNavbar';
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import FilterEnquiry from '../../../components/Admin/Enquiry/FilterEnquiry';
import PagesList from '../../../components/Admin/Enquiry/PagesList';
import ReactPaginate from "react-paginate";

import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';
import swal from 'sweetalert';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'


export default function EditPage() {

      const params = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/pages/${params.id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setTitle(result.data.data.title);
            setContent(result.data.data.content);
        });
    }, [params.id]);



    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = {
            title: title,
            content: content,
        }

        axios.put(`${process.env.REACT_APP_BASE_URL}/admin/pages/${params.id}`, formData, {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(res => {
            if (res.data.success === true) {
                swal("Data is updated successfully", "success");
                navigate(`/admin/pages`);

            } else if (res.data.error) {
                swal(res.data.error.message, "error");

            }
        });

    }



  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar />
      <Navbar />
      <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
                    <h1 className='text-2xl text-black font-bold mb-3'>Edit Pages</h1>
                    <form className='mt-4 shadow-md p-4 rounded bg-white' onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className="border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                                </div>
                            </div>
                            <div className='col-sm-12'>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Content</label>
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        data = {content}
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            setContent(data);
                                        } }
                                    />
                                </div>
                            </div>                     
                            
                        </div>
                        <div className='flex'>
                            <button type="submit" className="text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Submit</button>
                            <Link to='/admin/pages' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
                        </div>
                    </form>
                </div>
            </div>
      <FooterAdmin />
    </div>
  )
}
