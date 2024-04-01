import { React, useState , useEffect  , useCallback } from 'react';
import Sidebar from '../../../components/Admin/Sidebar/Sidebar';
import AdminNavbar from "../../../components/Admin/Navbar/AdminNavbar";
import FooterAdmin from '../../../components/Admin/Footer/FooterAdmin';
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useAlert } from "react-alert";
import * as moment from 'moment';


export default function ChambalDates() {

    const [startDate, setStartDate] = useState(new Date());
    const alert = useAlert();
    const [details, setDetails] = useState([]);
    
    const [pageCount, setpageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [size] = useState(15);

    const GetDetails = useCallback( () =>  {
        axios.get(`${process.env.REACT_APP_BASE_URL}/chambal/disable-dates?page=${page}&size=${size}`, {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+localStorage.getItem('accessToken')
          },
        }).then(result => { 
            setDetails(result.data.data);
            setpageCount(Math.ceil(result.data.total / result.data.perPage));
            setPage(result.data.page);
        })
    },[page]);
    
    useEffect(() => {
    
        GetDetails();

    },[]);


    const fetchComments = async (currentPage) => {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/chambal/disable-dates?page=${currentPage}&size=${size}` , {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer `+localStorage.getItem('accessToken')
                },
            }
        );
        const data = await res.json();
  
        return data
      };

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        const commentsFormServer = await fetchComments(currentPage);
        setDetails(commentsFormServer.data);
    };

    const HandleDelete = (id) => {

        var result = window.confirm("Want to delete?");
        if (result) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/chambal/disable-dates/${id}`, {
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer `+localStorage.getItem('accessToken')
                },
              }).then(result => {
                  alert.success("Data is deleted");
                  setTimeout(() => {
                    window.location = '/admin/chambal-dates';
                   }, 1000);
              }) 
        }
    }

    const HandleFilter = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/chambal/disable-dates?page=`+page+'&size=5&filter_date='+moment(startDate).format("YYYY-MM-DD"), {
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Authorization': `Bearer `+localStorage.getItem('accessToken')
            },
          }).then(result => { 
                setDetails(result.data.data);
                setpageCount(Math.ceil(result.data.total / result.data.perPage));
                setPage(result.data.page);
          })
    }

    const HandleReset = () => {
        setStartDate();
        GetDetails();
    }


    const ImportCsv = (e) => {

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            const headers = text.slice(0,text.indexOf('\n')).split(';');

        }
        reader.readAsText(file);

        const formData = new FormData(); 
        formData.append( 
            "csv", 
            file, 
        );

        axios.post(`${process.env.REACT_APP_BASE_URL}/chambal/disable-dates/import-csv   ` , formData , {
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer `+localStorage.getItem('accessToken')
            },
          }).then(result => { 
                alert.success(result.data.message);
                setTimeout(() => {
                    window.location = '/admin/chambal-dates';
                   }, 1000);
          })
    }

  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar/>
      <AdminNavbar/>
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle Chambal-Dates
">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h1 className='text-2xl text-black font-bold mb-3'>Chambal Dates</h1>
                    <div className='mt-2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="file_input">Import CSV file</label>
                        <input onChange = {ImportCsv} name ="file" className="block text-sm text-gray-900 bg-white rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                    </div>
                </div>
                <div className='mt-50'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Filter by date</label>
                    <div className='flex'>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        <button type="button" onClick = {HandleFilter} className="min-150 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-2">
                            Filter
                        </button>
                        { startDate &&  
                          <button type="button" onClick = {HandleReset} className="min-150 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-2">
                             Reset Filter
                         </button>
                        }
                    </div>
                    
                </div>
                <div className='mt-77'>
                    <Link to='/admin/add-chambal-dates' type="submit" className="text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center">Add</Link>
                </div>
            </div>
            <div className='table-responsive'>
            <table className='table bg-white border border-slate-300 mt-4'>
                <thead>
                    <tr>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Date</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Created Date</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Updated Date</th>
                        <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
                    </tr>
                </thead>
                <tbody>
                { details && details.map((item,index) => (
                    <tr key={index}>
                        <td className='border border-slate-300 text-center'>{item.date}</td>
                        <td className='border border-slate-300 text-center'>{moment(item.createdAt).format("YYYY-MM-DD")}</td>
                        <td className='border border-slate-300 text-center'>{moment(item.updatedAt).format("YYYY-MM-DD")}</td>
                        <td className='border border-slate-300 text-center'>
                        <Link to={`/admin/edit-chambal-dates/${item._id}`} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                             <i className="fas fa-pencil"></i>
                         </Link>
                         <Link onClick={() => HandleDelete(item._id)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                             <i className="fas fa-trash"></i>
                         </Link>
                        </td>
                    </tr>
                     )) }
                </tbody>
            </table>
            </div>
                    <ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
        </div>
      </div>
      <FooterAdmin/>
    </div>
  )
}