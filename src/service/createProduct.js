import generateID from "./generateID";

export default function createProduct() {
    // debugger
    return {...defaultProduct, id: generateID()}
}

const defaultCampaign = {
    name: "Нет",
    value: 0
};

const defaultLocation = {
    title: "Услуга",
};

const defaultProduct = {
    id: null,
    name: '',
    size: '',
    content: '',
    price: '',
    number: 1,
    discount: '',
    campaign: defaultCampaign,
    sum: 0,
    guarantee: 0,
    location: defaultLocation
};