import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import api from '../../services/api';

import Header from '../../components/Header';
import SelectAddress from '../../components/Forms/SelectAddress';
import PointItems from '../../components/Forms/PointItems';
import CollectPoint from '../../components/CollectPoint';

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

interface Point {
    id: number;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
}

const Points = () => {

    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState( '0');
    const [selectedCity, setSelectedCity] = useState( '0');

    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const [filtredPoints, setFiltredPoints] = useState<Point[]>([]);

    const [layoutStage, setLayoutStage] = useState({
        isFetchingData: false,
        isFetched: false,
    });

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

        const fetchingPoints = () => {

            setLayoutStage( { ...layoutStage, isFetchingData: true, isFetched: false });

            const items = String(selectedItems.join(',').trim());

            api.get(`/points`, {
                params: {
                    uf: selectedUf,
                    city: selectedCity,
                    items
                }
            }).then( res => {
                setLayoutStage( { ...layoutStage, isFetchingData: false, isFetched: true });
                setFiltredPoints(res.data);
            });
        }


        setFiltredPoints([]);
        setLayoutStage( { ...layoutStage, isFetched: false });

        
        if (selectedUf !== '0' && selectedCity !== '0' && selectedItems.length) {
            
            fetchingPoints();
        }

    }, [selectedUf, selectedCity, selectedItems]);


    const handleSelectedAddress = (event: ChangeEvent<HTMLSelectElement>) => {

        const { value, name } = event.target;
        return name === 'uf' ? setSelectedUf(value) : setSelectedCity(value);
    }

    const handleSelectedItem = (id: number) => {
        
        const isAlreadySelected = selectedItems.some( item => item === id );
        const newItems = (isAlreadySelected) 
            ? selectedItems.filter( item => item !== id)
            : [ ...selectedItems, id ];

        setSelectedItems(newItems);
    }


    return (
        <div id='points'>
            
            <Header/>

            <section>
                
                <form>
                    <h1>Encontre um ponto de coleta</h1>

                    <fieldset className='layout-fieldset'>
                        <legend>
                            <h2>Endereço</h2>
                            <span>Selecione a UF e a cidade</span>
                        </legend>

                        <SelectAddress 
                            changeAddress={ handleSelectedAddress }
                            selectedUf={ selectedUf }
                            ufs={ ufs }
                            selectedCity={ selectedCity }
                            cities={ cities }
                        />
                
                    </fieldset>

                    <PointItems 
                        onSelected={ handleSelectedItem }
                        items={ items }
                        selectedItems={ selectedItems }
                        size='small'
                    />

                </form>


                <div className='responseBox'>
                    
                    { layoutStage.isFetchingData && (
                        <span>Buscando Pontos de coleta...</span>
                    )}

                    { (layoutStage.isFetched && filtredPoints.length > 0 ) && (
                        <>
                            <h2>Pontos de coleta: </h2>
                            <ul>
                                { filtredPoints.map( (point: Point) => (
                                    <CollectPoint key={ point.id } point={ point } />
                                )) }
                            </ul>
                        </>
                    )}

                    { (layoutStage.isFetched && filtredPoints.length === 0) && (
                        <span>Não há nenhum ponto de coleta deste tipo cadastrado nessa região.</span>
                    )}
                </div>

            </section>

        </div>
            
    )
}

export default Points;