import React from 'react'
import { Link } from 'react-router-dom'

export default function ChambalOptions() {
  return (
    <div className='container sectionFrame'>
        <div className='chamBalOptions'>
            <div className="listing-section">
                <div className="row">
                    <div className="col-sm-3 col-xs-12 grid-padding-right">
                    <div className="product">
                        <h3 style={{textAlign: "center", marginTop: "5px", marginBottom: "5px", marginLeft: "52px"}}>
                        <strong>
                            <b>Chambal Safari Option 1</b>
                        </strong>
                        </h3>
                        <div className="image-box">
                        <div className="images" id="image-1" style={{backgroundImage: "url(../image/Chambal-safari-2.jpeg)"}}></div>
                        </div>
                        <div className="text-box">
                        <h2 className="item">Chambal Safari booking</h2>
                        <p>
                            <i aria-hidden="true" className="fa fa-check-circle" style={{color: "#008000", fontSize: "14px"}}></i> Chambal Safari
                        </p>
                        <p>
                            <i aria-hidden="true" className="fa fa-times-circle" style={{color: "#eb394a", fontSize: "14px"}}></i> Pickup &amp; Drop
                        </p>
                        <p>
                            <i aria-hidden="true" className="fa fa-times-circle" style={{color: "#eb394a", fontSize: "14px"}}></i> Lunch
                        </p>
                        <p>
                            <i aria-hidden="true" className="fa fa-check-circle" style={{color: "#008000", fontSize: "14px"}}></i> Life Jackets
                        </p>
                        <Link to="/chambal-safari-booking/1">
                            <button id="item-1-button" name="item-1-button" type="button">Select</button>
                        </Link>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-3 col-xs-12 grid-padding-right">
                    <div className="product">
                        <h3 style={{textAlign: "center", marginTop: "5px", marginBottom: "5px", marginLeft: "52px"}}>
                        <strong>
                            <b>Chambal Safari Option 2</b>
                        </strong>
                        </h3>
                        <div className="image-box">
                        <div className="images" id="image-3" style={{backgroundImage: "url(../image/Chambal-safari-sawaimadhopur.jpeg)"}}></div>
                        </div>
                        <div className="text-box">
                        <h2 className="item">Chambal Safari Booking with Pickup and Drop from Resort</h2>
                        <p>
                            <i aria-hidden="true" className="fa fa-check-circle" style={{color: "#008000", fontSize: "14px"}}></i> Chambal Safari
                        </p>
                        <p>
                            <i aria-hidden="true" className="fa fa-check-circle" style={{color: "#008000", fontSize: "14px"}}></i> Pickup &amp; Drop
                        </p>
                        <p>
                            <i aria-hidden="true" className="fa fa-times-circle" style={{color: "#eb394a", fontSize: "14px"}}></i> Lunch
                        </p>
                        <p>
                            <i aria-hidden="true" className="fa fa-check-circle" style={{color: "#008000", fontSize: "14px"}}></i> Life Jackets
                        </p>
                        <Link to="/chambal-safari-booking/2">
                            <button id="item-1-button" name="item-1-button" type="button">Select</button>
                        </Link>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-3 col-xs-12 grid-padding-right">
                    <div className="product">
                        <h3 style={{textAlign: "center", marginTop: "5px", marginBottom: "5px", marginLeft: "52px"}}>
                        <strong>
                            <b>Chambal Safari Option 3</b>
                        </strong>
                        </h3>
                        <div className="image-box">
                        <div className="images" id="image-2" style={{backgroundImage: "url(../image/Chambal-safari-3.jpeg)"}}></div>
                        </div>
                        <div className="text-box">
                        <h2 className="item">Chambal Safari Booking with Lunch</h2>
                        <p>
                            <i aria-hidden="true" className="fa fa-check-circle" style={{color: "#008000", fontSize: "14px"}}></i> Chambal Safari
                        </p>
                        <p>
                            <i aria-hidden="true" className="fa fa-times-circle" style={{color: "#ea2349", fontSize: "14px"}}></i> Pickup &amp; Drop
                        </p>
                        <p>
                            <i aria-hidden="true" className="fa fa-check-circle" style={{color: "#008000", fontSize: "14px"}}></i> Lunch
                        </p>
                        <p>
                            <i aria-hidden="true" className="fa fa-check-circle" style={{color: "#008000", fontSize: "14px"}}></i> Life Jackets
                        </p>
                        <Link to="/chambal-safari-booking/3">
                            <button id="item-1-button" name="item-1-button" type="button">Select</button>
                        </Link>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-3 col-xs-12">
                    <div className="product">
                        <h3 style={{textAlign: "center", marginTop: "5px", marginBottom: "5px", marginLeft: "52px"}}>
                        <strong>
                            <b>Chambal Safari Option 4</b>
                        </strong>
                        </h3>
                        <div className="image-box">
                        <div className="images" id="image-4" style={{backgroundImage: "url(../image/Chambal-safari.jpeg)"}}></div>
                        </div>
                        <div className="text-box">
                        <h2 className="item">Chambal Safari Booking with Lunch including Pickup and Drop from Resort</h2>
                        <p>
                            <i aria-hidden="true" className="fa fa-check-circle" style={{color: "#008000", fontSize: "14px"}}></i> Chambal Safari
                        </p>
                        <p>
                            <i aria-hidden="true" className="fa fa-check-circle" style={{color: "#008000", fontSize: "14px"}}></i> Pickup &amp; Drop
                        </p>
                        <p>
                            <i aria-hidden="true" className="fa fa-check-circle" style={{color: "#008000", fontSize: "14px"}}></i> Lunch
                        </p>
                        <p>
                            <i aria-hidden="true" className="fa fa-check-circle" style={{color: "#008000", fontSize: "14px"}}></i> Life Jackets
                        </p>
                        <Link to="/chambal-safari-booking/4">
                            <button id="item-1-button" name="item-1-button" type="button">Select</button>
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
