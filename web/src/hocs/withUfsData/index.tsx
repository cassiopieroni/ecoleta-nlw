import React, { useState, useEffect, ComponentType } from "react";
import axios from 'axios';

interface Data {
    ufs: string[];
}

interface IBGEUfResponse {
    sigla: string;
}


export function withUfsData<P>(WrappedComponent: ComponentType<P & Data>) {

    const ComponentWithUfsData: React.FC<P & Data> = (props) => {
        
        const [ufs, setUfs] = useState<string[]>([])

        useEffect( () => {

            axios.get<IBGEUfResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
                .then( res => {
                    const ufInitials = res.data.map( uf => uf.sigla)
                    setUfs( ufInitials.sort());
                })
        }, []);

        return <WrappedComponent  {...props} ufsData={ ufs } />
    };

    return ComponentWithUfsData;
}