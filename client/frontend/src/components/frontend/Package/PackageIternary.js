import React from 'react'

export default function PackageIternary({ packages }) {
    return (
        <div className='container secctionFrame' id="Overview">
            <div className='package-Itinerary'>
                <h5>Tour Itinerary</h5>
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    {packages?.package?.iternaries.map((list, lindex) => (

                        <div key={lindex} className="panel panel-default">
                            <div className="panel-heading" role="tab" id={`heading${lindex}`}>
                                <h4 className="panel-title">
                                    <a role="button" data-toggle="collapse" data-parent="#accordion" href={`#collapse${lindex}`} aria-expanded="true" aria-controls={`collapse${lindex}`} className=" "> {list.title} </a>
                                </h4>
                            </div>
                            <div id={`collapse${lindex}`} className="panel-collapse collapse in" style={{visibility:"visible"}} role="tabpanel" aria-labelledby={`heading${lindex}`}>
                                <div className="panel-body">
                                    <p>{list.description}</p>
                                </div>
                            </div>
                        </div>

                    ))}

                </div>
            </div>
        </div>
    )
}
