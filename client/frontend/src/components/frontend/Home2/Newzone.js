import React from 'react'

export default function Newzone() {
  return (
    <section className="safarizone">
        <div className="container">
            <h4>Safari Zone Information</h4>
            <div className="row">
                <div className="col-sm-6 col-xs-12">
                    <div className="zoneimg">
                    <img alt="Safari Banner" className="img-responsive" src="../image/b3.png"/>
                    </div>
                </div>
                <div className="col-sm-6 col-xs-12">
                    <div className="zoneinfo">
                        <div className="zoneicon">
                            <img alt="right-arrow" src="../image/icons/checked-black.png"/>
                        </div>
                        <p>Zone will be allowed as per availability</p>
                    </div>
                    <div className="zoneinfo">
                        <div className="zoneicon">
                            <img alt="right-arrow" src="../image/icons/checked-black.png"/>
                        </div>
                        <p>Visitor can select either Zone 1 to 7 or 8 to 10</p>
                    </div>
                    <div className="zoneinfo">
                        <div className="zoneicon">
                            <img alt="right-arrow" src="../image/icons/checked-black.png"/>
                        </div>
                        <p>There are 10 Safari Zone in Ranthambore National park</p>
                    </div>
                    <div className="zoneinfo">
                        <div className="zoneicon">
                            <img className='min32' alt="right-arrow" src="../image/icons/checked-black.png"/>
                        </div>
                        <p>If you select Safari for 1 to 7 Zone that means your safari will be conducted in any one Zone, same as for Zone 8 to 10</p>
                    </div>
                    <div className="zoneinfo">
                        <div className="zoneicon">
                            <img className='min32' alt="right-arrow" src="../image/icons/checked-black.png"/>
                        </div>
                        <p>In Case of current booking any of the zone between 1 and 10 can be alloted</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
