import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';
import PointAddress from '../../components/Fieldsets/PointAddress';
import PointItems from '../../components/Fieldsets/PointItems';
import PointCard from '../../components/PointCard';

import { withItemsData } from '../../hocs/withItemsData';
import { withUfsData } from '../../hocs/withUfsData';

import { useCitiesByUf } from '../../hooks/useCitiesByUf';

import { DIV_PAGE, DIV_CONTAINER, FORM, DIV_RESPONSE_API } from './styles';


interface Item {
    id: number;
    title: string;
    image_url: string;
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

    const [selectedUf, setSelectedUf] = useState( '0');
    const [selectedCity, setSelectedCity] = useState( '0');

    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const [filtredPoints, setFiltredPoints] = useState<Point[]>([]);

    const [layoutStage, setLayoutStage] = useState({
        isFetchingData: false,
        isFetchedData: false,
    });


    const cities = useCitiesByUf(selectedUf);


    useEffect( () => {

        const fetchingFiltredPoints = () => {

            setLayoutStage( prevState => ({ ...prevState, isFetchingData: true }) );

            const items = String( selectedItems.join(',').trim());

            api.get(`/points`, {
                params: {
                    uf: selectedUf,
                    city: selectedCity,
                    items
                }
            }).then( res => {
                setLayoutStage( prevState => ({ ...prevState, isFetchingData: false, isFetchedData: true }) );
                setFiltredPoints(res.data);
            });
        }


        setFiltredPoints([]);
        setLayoutStage( prevState => ({ ...prevState, isFetchedData: false }) );
        
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


    const { isFetchingData, isFetchedData } = layoutStage;

    return (

        <DIV_PAGE>
            
            <Header/>

            <DIV_CONTAINER>
                
                <FORM>
                    
                    <h1>Encontre um ponto de coleta</h1>


                    <PointAddress 
                        changeAddress={ handleSelectedAddress }
                        selectedUf={ selectedUf }
                        ufs={ ufsData }
                        selectedCity={ selectedCity }
                        cities={ cities }
                    />

                    <PointItems 
                        onSelected={ handleSelectedItem }
                        items={ itemsData }
                        selectedItems={ selectedItems }
                        size='small'
                    />

                </FORM>


                <DIV_RESPONSE_API>
                    
                    { isFetchingData && (
                        <span>Buscando Pontos de coleta...</span>
                    )}

                    { (isFetchedData && filtredPoints.length > 0 ) && (
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

                    { (isFetchedData && filtredPoints.length === 0) && (
                        <span>Não há nenhum ponto de coleta deste tipo cadastrado nessa região.</span>
                    )}

                </DIV_RESPONSE_API>

            </DIV_CONTAINER>

        </DIV_PAGE>
            
    )
}


export default withUfsData( withItemsData(Points));