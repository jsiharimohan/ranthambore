import React from 'react'

export default function Attraction() {
  return (
    <section id="tourist-attraction">
    <div className="container sectionFrame">
        <h3>Tourist Attractions in Ranthambore</h3>
        <div className="row">
        <div className="col-sm-4 col-xs-12 padding-right-zero">
            <div className="img-overlay">
            <img alt="Canter Safari" className="img-responsive leftimg img-overlay-image" src="../image/center-safari.png" />
            <div className="overlay">
                <div className="overlaybgleft">
                <div className="text">Canter Safari</div>
                </div>
            </div>
            </div>
        </div>
        <div className="col-sm-8 col-xs-12 padding-left-zero">
            <div className="row">
            <div className="col-sm-12 col-xs-12">
                <div className="img-overlay">
                <img alt="Sight Seeing" className="img-responsive img-overlay-image" src="../image/sight-seeing.png" />
                <div className="overlay">
                    <div className="overlaybgtop">
                    <div className="text">Sight Seeing</div>
                    </div>
                </div>
                </div>
            </div>
            <div className="col-sm-6 col-xs-12 padding-right-zero">
                <div className="img-overlay">
                <img alt="Bird Attractions" className="img-responsive img-overlay-image" src="../image/bird.png" />
                <div className="overlay">
                    <div className="overlaybgbottom">
                    <div className="text">Bird Attractions</div>
                    </div>
                </div>
                </div>
            </div>
            <div className="col-sm-6 col-xs-12 padding-left-zero">
                <div className="img-overlay">
                <img alt="Jeep Safari" className="img-responsive img-overlay-image" src="../image/gypsy-safari.png" />
                <div className="overlay">
                    <div className="overlaybgbottom overlaybgbottom2">
                    <div className="text">Jeep Safari</div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>
  )
}
