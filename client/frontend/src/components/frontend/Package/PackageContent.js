import React from 'react'
import EnquiryForm from '../Common/EnquiryForm'
import { Link } from 'react-router-dom'

export default function PackageContent() {
    return (
        <div className='packages-detail'>
            <div className='container sectionFrame mb-8'>
                <div className='row'>
                    <div className='col-sm-9 col-xs-12 width70'>
                        <h2>Ranthambore Packages</h2>
                        <p>A pre-designed Ranthambore tour package is a convenient and hassle-free way for tourists to explore the wildlife and natural beauty of Ranthambore National Park. These packages typically include accommodation, transportation, and safari tours, along with visits to nearby attractions such as Ranthambore Fort and Padam Talao. By booking a pre-designed tour package, tourists can avoid the stress of planning and organizing their own itinerary, and can instead rely on experienced tour operators to provide a well-rounded and enjoyable experience.</p>
                        <br></br>
                        <p>Booking a Ranthambore tour package online through our website,  <Link to="http://www.ranthamboretigerreserve.in" target="_blank">http://www.ranthamboretigerreserve.in</Link>, is a simple and secure process that allows tourists to select the package that best fits their interests, budget, and schedule. Our website provides detailed information about each package, including the number of safari tours included, the type of accommodation provided, and the cost per person. Additionally, our friendly and knowledgeable customer service team is available to answer any questions and provide assistance throughout the booking process. With our Ranthambore tour package, tourists can enjoy a stress-free and unforgettable adventure in the heart of Rajasthan's wilderness.</p>
                        {/* <br></br>
                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                            praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
                            excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                            officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                            rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis
                            est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere
                            possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem
                            quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
                            voluptates repudiandae sint et molestiae non recusandae.</p> */}
                    </div>
                    <div className='col-sm-3 col-xs-12 width30'>
                        <EnquiryForm hotel_id='' type='package' />
                    </div>
                </div>
            </div>
        </div>
    )
}
