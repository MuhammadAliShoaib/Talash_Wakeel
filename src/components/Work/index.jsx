import React from 'react';
import './styles.css';
import Image from "../../assets/balance.png"

export default function Work({ title, description }) {
    return (
        <div className="work-container">
            <div className="circle-container">
                <div className="circle">
                    <img src={Image} style={{ width: '35px', height: '35px', }} />
                </div>
            </div>
            <div className='text-container'>
                <h2 className='mt-3'>{title}</h2>
                <p className="work-description">{description}</p>
            </div>
        </div>
    )
}
