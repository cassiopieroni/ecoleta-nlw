import React from 'react';

import { FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

import MapBox from '../MapBox';

import { DIV, DIV_CONTACT, DIV_CONTACT_INFOS, DIV_MAP } from './styles';


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

        <DIV>

            <h2>Contato</h2>

            <DIV_CONTACT>

                <DIV_CONTACT_INFOS>

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

                </DIV_CONTACT_INFOS>

                <DIV_MAP>

                    <MapBox 
                        initialPosition={ [latitude, longitude] } 
                        selectedPosition={ [latitude, longitude] } 
                    />

                </DIV_MAP>
            
            </DIV_CONTACT>
        
        </DIV>
    )
};

export default PointContact;