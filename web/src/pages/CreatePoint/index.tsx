import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import api from '../../services/api';

import { LeafletMouseEvent } from 'leaflet';

import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';
import PointData from '../../components/FormCreatePoint/PointData';
import PointAddress from '../../components/FormCreatePoint/PointAddress';
import PointItems from '../../components/FormCreatePoint/PointItems';
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

const CreatPoint = () => {

    const history = useHistory();


    const [initialMapPosition, setInitialMapPosition] = useState<[number, number]>([0,0]);

    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [pointData, setPointData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    });

    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedMapPosition, setSelectedMapPosition] = useState<[number, number]>([0,0]);
    const [selectedFile, setSelectedFile] = useState<File>();

    const [isResponse, setIsResponse] = useState(false);
    const [responseError, setResponseError] = useState({});


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
    }, [selectedUf])


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

        const data = createData( pointData, selectedMapPosition, selectedUf, selectedCity, selectedItems, selectedFile);

        await api.post('points', data)
            .then( res => {
                console.log(res);
                return setIsResponse(true);
            })
            .catch( error => {
                setResponseError(error.response.data)
                return setIsResponse(true);
            });
        
        // alert('ponto cadastrado com sucesso!');
        // history.push('/');
    };


    return (

        <div id="page-create-point">
            
            <Header isLinkToHome />

            <form onSubmit={ handleSubmit }>

                <h1>Cadastro do ponto de coleta</h1>

                <Dropzone onFileUploaded={ setSelectedFile } /> 

                <PointData changed={ handleChangePointData } />

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

                <button type='submit'>
                    Cadastrar Ponto de Coleta
                </button>

                <RegistrationMessage isMessage={  isResponse } error={ responseError } />

            </form>
        </div>
    )
}

export default CreatPoint;