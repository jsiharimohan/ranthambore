import React , { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from "react-alert";
import axios from 'axios'

export default function PriceList( { type } ) {

    const [details , setDetails] = useState([]);
    const alert = useAlert();
    function getDetails(type) {

      const typeData = type == 'chambal' ? 'chambal' : 'safari';

      axios.get(`${process.env.REACT_APP_BASE_URL}/${typeData}/prices?type=${type}`, {
          headers: {
            'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Authorization': `Bearer `+localStorage.getItem('accessToken')
            },
          }).then(result => { 
                setDetails(result.data.data);
          })   
    }
  
    useEffect(() => {
       getDetails(type);
    },[]);

    const HandleDelete = (id) => {
      var result = window.confirm("Want to delete?");
        if (result) {
          const typeData = type == 'chambal' ? 'chambal' : 'safari';
            axios.delete(`${process.env.REACT_APP_BASE_URL}/${typeData}/prices/${id}?type=${type}`, {
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer `+localStorage.getItem('accessToken')
                },
              }).then(result => {
                  alert.success("Data is deleted");
                  setTimeout(() => {
                    window.location = `/admin/price-list/${type}`
                  }, 1000);
              })
          }
    }
  

  return (
    <>
    <div className='float-right'>
      <Link to={`/admin/add-price/add/${type}`} className="text-white bg-success font-medium rounded px-5 py-2.5 text-center">
        Add price
      </Link>
    </div>
    <div className='clear-right'></div>
    <div className='table-responsive'>
        <table className='table bg-white border border-slate-300 mt-4'>
             <thead>
                 <tr>
                     <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>#</th>
                     { type == 'festival' ? 
                      <>
                         <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Name</th>
                         <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Start Date</th>
                         <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>End Date</th>
                      </>
                         
                         :

                         <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Name</th>
                    
                    }
                    
                     <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Price</th>
                     <th className='border border-slate-300 text-center bg-hotel-maroon text-white'>Action</th>
                 </tr>
             </thead>
                <tbody>
                    { details && details.map((item,index) => (
                        <tr key={index}>
                            <td className='border border-slate-300 text-center'>{index+1}</td>
                            { type == 'festival' ? 
                                <>
                                    <td className='border border-slate-300 text-center'>{item.name}</td>
                                    <td className='border border-slate-300 text-center'>{item.date_from}</td>
                                    <td className='border border-slate-300 text-center'>{item.date_to}</td>
                                </>
                                    
                                    :

                                    <td className='border border-slate-300 text-center'>{item.name}</td>
                                
                            }
                            
                            <td className='border border-slate-300 text-center'>{item.price}</td>
                            <td className='border border-slate-300 text-center'>
                            <Link to={`/admin/edit-price/${item._id}/${type}`} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                <i className="fas fa-pencil"></i>
                            </Link>
                            <Link onClick = {() => HandleDelete(item._id)}  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                <i className="fas fa-trash"></i>
                            </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
         </table>
         </div>
    </>
  )
}
