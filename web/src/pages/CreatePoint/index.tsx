import React, { useEffect, useState, createContext, ChangeEvent, FormEvent } from 'react';
import api from '../../services/api';

import { LeafletMouseEvent } from 'leaflet';

import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';
import PointData from '../../components/Forms/PointData';
import PointAddress from '../../components/Forms/PointAddress';
import PointItems from '../../components/Forms/PointItems';
import IncompleteFormMessage from '../../components/Forms/IncompleteFormMessage';
import RegistrationMessage from '../../components/RegistrationMessage';

import { withItemsData } from '../../hocs/withItemsData';
import { withUfsData } from '../../hocs/withUfsData';

import { useCitiesByUf } from '../../hooks/useCitiesByUf';

import { createFormData } from './helpers'

import './styles.css';


interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface Props {
    itemsData: Item[];
    ufsData: string[];
}


export const IncompleteFieldsOnFormContext = createContext(false);


const CreatPoint = (props: Props) => {

    const { itemsData, ufsData } = props;

    
    const [pointData, setPointData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    });
    const [initialMapPosition, setInitialMapPosition] = useState<[number, number]>([0,0]);

    const [selectedFile, setSelectedFile] = useState<File>();
    const [selectedMapPosition, setSelectedMapPosition] = useState<[number, number]>( [0,0]);
    const [selectedUf, setSelectedUf] = useState( '0');
    const [selectedCity, setSelectedCity] = useState( '0');
    const [selectedItems, setSelectedItems] = useState<number[]>([]); 

    const [isApiResponse, setIsApiResponse] = useState( false);
    const [apiResponseError, setApiResponseError] = useState( {});

    const [isValidForm, setIsValidForm] = useState( false);
    const [isShowingMsgsToFillForm, setIsShowingMsgsToFillForm] = useState( false);

    const cities = useCitiesByUf(selectedUf);


    useEffect( () => {

        navigator.geolocation.getCurrentPosition( pos => {
            const { latitude, longitude } = pos.coords;
            setInitialMapPosition([latitude, longitude]);
        });
    }, []);


    useEffect( () => {

        const { name, email, whatsapp } = pointData;

        const isCompleteForm = () => (
            (selectedFile && selectedFile.name) &&
            (name && email && whatsapp) &&
            (selectedUf !== '0' && selectedCity !== '0') && 
            (selectedMapPosition[0] !== 0) &&
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
        console.log('item')
        const isAlreadySelected = selectedItems.some( item => item === id );
        const newItems = (isAlreadySelected) 
            ? selectedItems.filter( item => item !== id)
            : [ ...selectedItems, id ];

        setSelectedItems(newItems);
    }

    const handleSubmit = async (event: FormEvent) => {

        event.preventDefault();
        
        if (isValidForm) {

            const propsData = {
                pointData, 
                selectedMapPosition, 
                selectedUf, 
                selectedCity, 
                selectedItems, 
                selectedFile
            }

            const data = createFormData(propsData);

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
                        ufs={ ufsData }
                        selectedCity={ selectedCity }
                        cities={ cities }
                    />

                    <PointItems 
                        onSelected={ handleSelectedItem }
                        items={ itemsData }
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
                    

                    <RegistrationMessage isMessage={ isApiResponse } error={ apiResponseError } />

                </form>
            </IncompleteFieldsOnFormContext.Provider>
        </div>
    )
}

export default withUfsData( withItemsData( CreatPoint));