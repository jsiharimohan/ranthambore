import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Cancellation() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/pages/slug/cancellation-policy`).then(res => {

            if (res.status === 200) {
                setTitle(res.data.data.title);
                setContent(res.data.data.content);
            } else {
            }
        }).catch(error => {
        })
    }, [])

      return (
        <div class="container" style={{padding: "30px 0"}}>
            <div className='bodyHeight'>
                <h3 style={{textAlign: "center"}}>{title}</h3>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
      )
    }
