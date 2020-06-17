interface PointData {
    name: string,
    email: string,
    whatsapp: string,
}

interface PropsData {
    pointData: PointData; 
    selectedMapPosition: [number, number];
    selectedUf: string; 
    selectedCity: string; 
    selectedItems: number[]; 
    selectedFile?: File;
}

export const createFormData = (propsData: PropsData) => {
    
    const { pointData, selectedMapPosition, selectedUf, selectedCity, selectedItems, selectedFile } = propsData;

    const { name, email, whatsapp } = pointData;
    const [latitude, longitude] = selectedMapPosition;
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
    
    return data;
}