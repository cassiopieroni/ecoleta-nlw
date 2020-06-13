import React, { useCallback, useState, useContext } from 'react'
import {useDropzone} from 'react-dropzone'

import IncompleteFormMessage from '../Forms/IncompleteFormMessage';

import { FiUpload } from 'react-icons/fi';
import './styles.css';

import { IncompleteFieldsOnFormContext } from '../../pages/CreatePoint';


interface Props {
    onFileUploaded: (file: File) => void;
}


const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {

    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const incompleteForm = useContext( IncompleteFieldsOnFormContext);

    const onDrop = useCallback(acceptedFiles => {
        
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);
    
        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded])
    
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    })

    
    return (
        <>
            <div className='dropzone' {...getRootProps()}>
                <input {...getInputProps()} accept='image/*' />
                
                { selectedFileUrl
                    ? <img src={ selectedFileUrl } alt="Point thumbnail"/>
                    : (
                        <p>
                            <FiUpload />
                            Imagem do estabelecimento!
                        </p> 
                    )
                }
            </div>

            { ( incompleteForm && !selectedFileUrl ) &&
                <IncompleteFormMessage>*É necessário uma imagem do estabelecimento.</IncompleteFormMessage>
            }
        </>
    )
}

export default Dropzone;