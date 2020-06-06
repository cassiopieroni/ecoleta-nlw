import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import Dropzone from '../../components/Dropzone';

import './styles.css';
import logo from '../../assets/logo.svg';


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

    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState('0'); 

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    })

    const [cities, setCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
    const [selectedFile, setSelectedFile] = useState<File>();

    useEffect( () => {
        navigator.geolocation.getCurrentPosition( pos => {
            const { latitude, longitude } = pos.coords;
            setInitialPosition([latitude, longitude]);
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

    const handleInputElement = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleMapClick = (event: LeafletMouseEvent) => {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
    }

    const handleSelectedItem = (id: number) => {
        
        const alreadySelected = selectedItems.findIndex( item => item === id );
        const newItems = (alreadySelected >= 0) 
            ? selectedItems.filter( item => item !== id)
            : [ ...selectedItems, id ];

        setSelectedItems(newItems);
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const { name, email, whatsapp } = formData;
        const [latitude, longitude] = selectedPosition;
        const uf = selectedUf;
        const city = selectedCity;
        const items = selectedItems;

        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('uf', uf);
        data.append('city', city);
        data.append('items', items.join(','));

        if (selectedFile) {
            data.append('image', selectedFile);
        }

        await api.post('points', data);
        
        alert('ponto cadastrado com sucesso!');
        history.push('/');
    };


    return (

        <div id="page-create-point">
            <header>
                
                <img src={logo} alt="logotipo ecoleta"/>

                <Link to='/'>
                    <FiArrowLeft />
                    Voltar para a home
                </Link>

            </header>

            <form onSubmit={ handleSubmit }>
                <h1>Cadastro do ponto de coleta</h1>

                <Dropzone onFileUploaded={ setSelectedFile } /> 

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            onChange={ handleInputElement }
                        />
                    </div>

                    <div className="field-group">
                        
                        <div className="field">
                            <label htmlFor="email">email</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                onChange={ handleInputElement }
                            />
                        </div>
                        
                        <div className="field">
                            <label htmlFor="whatsapp">whatsapp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={ handleInputElement }
                            />
                        </div>
                    
                    </div>
                </fieldset>


                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={ initialPosition } zoom={15} onClick={ handleMapClick } >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={ selectedPosition } />
                    </Map>
                    
                    <div className="field-group">
                        
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select 
                                name="uf" 
                                id="uf" 
                                onChange={ handleSelectedAddress } 
                                value={ selectedUf }
                            >
                                <option value="0">Selecione uma UF</option>
                                { ufs.map( uf => (
                                    <option key={ uf } value={ uf }>{ uf }</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select 
                                name="city" 
                                id="city"
                                onChange={ handleSelectedAddress }
                                value={ selectedCity }
                            >
                                <option value="0">Selecione uma cidade</option>
                                { cities.map( city => (
                                    <option key={ city } value={ city }>{ city }</option>
                                ))}
                            </select>
                        </div>
                    
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>itens de coleta</h2>
                        <span>Selecione um ou mais items abaixo</span>
                    </legend>
                        
                        <ul className="items-grid">
                            { items.map( item => (
                                <li 
                                    key={ item.id } 
                                    onClick={ () => handleSelectedItem(item.id) } 
                                    className={ selectedItems.includes(item.id) ? 'selected' : '' }    
                                >
                                    <img src={ item.image_url } alt={ item.title }/>
                                    <span>{ item.title }</span>
                                </li>
                            ))}   
                        </ul>
                    
                </fieldset>

                <button type='submit'>
                    Cadastrar Ponto de Coleta
                </button>
            </form>
        </div>
    )
}

export default CreatPoint;