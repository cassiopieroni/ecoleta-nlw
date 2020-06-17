import { useState, useEffect } from 'react';
import axios from 'axios';

interface IBGECityResponse {
    nome: string;
}

export const useCitiesByUf = (uf: String) => {

    const [cities, setCities] = useState<string[]>([]);

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;

    useEffect( () => {

        if (uf === '0') {
            
            setCities( []);
        
        } else {

            axios.get<IBGECityResponse[]>(url)
                .then( res => {
                    const cityNames = res.data.map( city => city.nome );
                    setCities( cityNames);
                })
        }
    }, [uf, url]);

    return cities;
}