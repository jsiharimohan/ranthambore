import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function About() {
      const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/pages/slug/about-us`).then(res => {

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
              <div className='discription'>
                <h3 style={{textAlign: "center"}}>{title}</h3>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            </div>
        </div>
      )
    }