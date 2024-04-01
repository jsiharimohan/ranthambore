import React,{ useState } from 'react'
import ContentImage from './ContentImage';
import PackagePricing from './PackagePricing'

export default function RoomType({ packages, type ,setData}) {

    
    return (
        <>
            <ul className="nav nav-tabs" id="roomTab" role="tablist">


                {packages?.categories?.map((list, lindex) => (
                    <li key={lindex.toString()} className="nav-item">
                        <a className={`nav-link ${lindex === 0 ? 'active' : ''}`} data-toggle="tab" href={`#tab-cat${type}${lindex}`} role="tab" aria-controls={`tab-cat${type}${lindex}`} >{list.category}</a>
                    </li>

                ))}
            </ul>
            <div className="tab-content" id="roomTabContent">

                {packages?.categories?.map((list, lindex) => (
                    <>
                        <div key={lindex.toString()} className={`tab-pane ${lindex === 0 ? 'active' : ''}`} id={`tab-cat${type}${lindex}`}>
                            { list.hotels && <ContentImage hotels={list.hotels} counterkey={type + lindex} /> }

                            {type === 'indian' ? <PackagePricing optionData={list?.indianOptions} packageName={packages?.package?.name} setData={setData} /> : <PackagePricing optionData={list?.foreignerOptions} packageName={packages?.package?.name} setData={setData} />}

                        </div>

                    </>


                ))}

            </div>
        </>
    )
}
