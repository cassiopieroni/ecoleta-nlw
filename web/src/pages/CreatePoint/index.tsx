import React, { useEffect, useState, createContext, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import api from '../../services/api';

import { LeafletMouseEvent } from 'leaflet';

import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';
import PointData from '../../components/Forms/PointData';
import PointAddress from '../../components/Forms/PointAddress';
import PointItems from '../../components/Forms/PointItems';
import IncompleteFormMessage from '../../components/Forms/IncompleteFormMessage';
import RegistrationMessage from '../../components/RegistrationMessage';

import { createData } from './helpers'

import './styles.css';


interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

export const IncompleteFieldsOnFormContext = createContext(false);


const CreatPoint = () => {

    const [pointData, setPointData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    });
    const [initialMapPosition, setInitialMapPosition] = useState<[number, number]>([0,0]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [items, setItems] = useState<Item[]>([]);

    const [selectedFile, setSelectedFile] = useState<File>();
    const [selectedMapPosition, setSelectedMapPosition] = useState<[number, number]>( [0,0]);
    const [selectedUf, setSelectedUf] = useState( '0');
    const [selectedCity, setSelectedCity] = useState( '0');
    const [selectedItems, setSelectedItems] = useState<number[]>([]); 

    const [isApiResponse, setIsApiResponse] = useState( false);
    const [apiResponseError, setApiResponseError] = useState( {});

    const [isValidForm, setIsValidForm] = useState( false);
    const [isShowingMsgsToFillForm, setIsShowingMsgsToFillForm] = useState( false);


    useEffect( () => {

        navigator.geolocation.getCurrentPosition( pos => {
            const { latitude, longitude } = pos.coords;
            setInitialMapPosition([latitude, longitude]);
        });
    }, [])

    useEffect( () => {

        api.get('items').then( res => {
            setItems(res.data)
        })
    }, []);
    
    useEffect( () => {

        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then( res => {
                const ufInitials = res.data.map( uf => uf.sigla)
                setUfs(ufInitials);
            })
    }, []);

    useEffect( () => {

        if (selectedUf === '0') {
            return;
        }
 
        axios
            .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then( res => {
                const cityNames = res.data.map( city => city.nome );
                setCities(cityNames);
            })
    }, [selectedUf]);

    useEffect( () => {

        const { name, email, whatsapp } = pointData;

        const isCompleteForm = () => (
            (selectedFile && selectedFile.name) &&
            (name && email && whatsapp) &&
            (selectedUf !== '0' && selectedCity !== '0') && 
            (selectedMapPosition[0] !== 0  && selectedMapPosition[1] !== 0) &&
            (selectedItems.length)
        );

        isCompleteForm() ? setIsValidForm( true) : setIsValidForm( false);

    }, [selectedFile, pointData, selectedUf, selectedCity, selectedMapPosition, selectedItems]);
    


    const handleSelectedAddress = (event: ChangeEvent<HTMLSelectElement>) => {

        const { value, name } = event.target;
        return name === 'uf' ? setSelectedUf(value) : setSelectedCity(value);
    }
 
    const handleChangePointData = (event: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;
        setPointData({ ...pointData, [name]: value });
    }

    const handleMapClick = (event: LeafletMouseEvent) => {

        setSelectedMapPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
    }

    const handleSelectedItem = (id: number) => {
        
        const isAlreadySelected = selectedItems.some( item => item === id );
        const newItems = (isAlreadySelected) 
            ? selectedItems.filter( item => item !== id)
            : [ ...selectedItems, id ];

        setSelectedItems(newItems);
    }

    const handleSubmit = async (event: FormEvent) => {

        event.preventDefault();
        
        if (isValidForm) {

            const data = createData( 
                pointData, selectedMapPosition, selectedUf, 
                selectedCity, selectedItems, selectedFile
            );

            await api.post('points', data)
                .then( res => {
                    console.log(res);
                    return setIsApiResponse(true);
                })
                .catch( error => {
                    setApiResponseError(error.response.data)
                    return setIsApiResponse(true);
                });

        } else {

            return setIsShowingMsgsToFillForm( true);
        }
    };


    return (

        <div id="page-create-point">
            
            <Header />

            <IncompleteFieldsOnFormContext.Provider value={ isShowingMsgsToFillForm } >
                
                <form onSubmit={ handleSubmit }>

                    <h1>Cadastro do ponto de coleta</h1>

                    <Dropzone onFileUploaded={ setSelectedFile } />

                    <PointData 
                        changed={ handleChangePointData } 
                        data={ pointData }    
                    />

                    <PointAddress
                        clickedOnMap={ handleMapClick }
                        changeAddress={ handleSelectedAddress }
                        initialPosition={ initialMapPosition }
                        selectedPosition={ selectedMapPosition }
                        selectedUf={ selectedUf }
                        ufs={ ufs }
                        selectedCity={ selectedCity }
                        cities={ cities }
                    />

                    <PointItems 
                        onSelected={ handleSelectedItem }
                        items={ items }
                        selectedItems={ selectedItems }
                    />

                    <div>
                        <button type='submit'>
                            Cadastrar Ponto de Coleta
                        </button>

                        { (isShowingMsgsToFillForm && !isValidForm) && 
                            <IncompleteFormMessage>Preencha os campos obrigatórios*</IncompleteFormMessage>
                        }
                    </div>
                    

                    <RegistrationMessage isMessage={  isApiResponse } error={ apiResponseError } />

                </form>
            </IncompleteFieldsOnFormContext.Provider>
        </div>
    )
}

export default CreatPoint;