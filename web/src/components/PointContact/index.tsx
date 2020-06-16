import React from 'react';

import { FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

import MapBox from '../MapBox';

import './styles.css';


interface Props {
    point: {
        email: string;
        whatsapp: string;
        city: string;
        uf: string;
        latitude: number;
        longitude: number;
    }
}


const PointContact: React.FC<Props> = ({ point }) => {

    const { email, whatsapp, city, uf, latitude, longitude } = point;


    return (

        <div className='contact'>

            <h2>Contato</h2>

            <div className="contact-content">

                <div className='contact-infos' >

                    <div>
                        <FiMail />
                        <p>{ email }</p>
                    </div>

                    <div>
                        <FaWhatsapp />
                        <p>{ whatsapp }</p>
                    </div>

                    <div>
                        <FaMapMarkerAlt />
                        <p>{`${ city }, ${ uf }`}</p>
                    </div>

                </div>

                <div className='map'>

                    <MapBox 
                        initialPosition={ [latitude, longitude] } 
                        selectedPosition={ [latitude, longitude] } 
                    />

                </div>
            
            </div>
        
        </div>
    )
};

export default PointContact;