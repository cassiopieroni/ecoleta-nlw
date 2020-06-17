import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import api from '../../services/api';

import Header from '../../components/Header';
import SelectAddress from '../../components/Forms/SelectAddress';
import PointItems from '../../components/Forms/PointItems';
import PointCard from '../../components/PointCard';

import { withItemsData } from '../../hocs/withItemsData';
import { withUfsData } from '../../hocs/withUfsData';

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

interface Props {
    itemsData: Item[];
    ufsData: string[];
}

const Points = (props: Props) => {
    
    const { itemsData, ufsData } = props;

    const history = useHistory();

    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState( '0');
    const [selectedCity, setSelectedCity] = useState( '0');

    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const [filtredPoints, setFiltredPoints] = useState<Point[]>([]);

    const [layoutStage, setLayoutStage] = useState({
        isFetchingData: false,
        isFetched: false,
    });


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

        const fetchingFiltredPoints = () => {

            setLayoutStage( { ...layoutStage, isFetchingData: true });

            const items = String( selectedItems.join(',').trim());

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
            
            fetchingFiltredPoints();
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

    const handleChangePage = (id: number) => {

        history.push(`/points/${id}`);
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
                            ufs={ ufsData }
                            selectedCity={ selectedCity }
                            cities={ cities }
                        />
                
                    </fieldset>

                    <PointItems 
                        onSelected={ handleSelectedItem }
                        items={ itemsData }
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
                                    <PointCard 
                                        key={ point.id } 
                                        point={ point } 
                                        clicked={ handleChangePage }    
                                    />
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


export default withUfsData( withItemsData(Points));