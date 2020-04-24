import toLocalDate from '../toLocalDate';
import capitalize from '../capitalize';

const writtenNumber = require('written-number');


export default function formatOrderData(unpreparedData) {
    writtenNumber.defaults.lang = "ru";
    const prepaymentInPercentage = unpreparedData.prepaymentInPercentage >= 40 ? unpreparedData.prepaymentInPercentage : 40;
    const products = unpreparedData.products.map((product, index) => ({
        ...product,
        order: index + 1,
        campaign: product.campaign.title,
        location: (product.location.title || product.location.name).toLocaleUpperCase('ru-RU')
    }));
    console.log(products);
    const campaignNote = getCampaignNoteFromProductList(unpreparedData.products);
    const customerInitials = `${unpreparedData.customerLastName} ${getFirstLetter(unpreparedData.customerFirstName)}.${getFirstLetter(unpreparedData.customerPatronymic)}`;
    const guarantees = getGuaranteedProducts(products);
    const modifiedData = {
        prepaymentInPercentage,
        products,
        customerInitials,
        guarantees,
        guarantees_length: guarantees.length,
        prepaymentInPercentageInWords: capitalize(writtenNumber(prepaymentInPercentage).toLocaleUpperCase()),
        prepaymentInRubInWords: capitalize(writtenNumber(unpreparedData.prepaymentInRub)),
        totalInWords: capitalize(writtenNumber(unpreparedData.total)),
        residueInWords: capitalize(writtenNumber(unpreparedData.residue)),
        purchaseDate: toLocalDate(unpreparedData.purchaseDate),
        completionDate: toLocalDate(unpreparedData.completionDate),
        credit: unpreparedData.credit ? 'РАССРОЧКА' : '',
        cashless: unpreparedData.cashless ? 'ТЕРМИНАЛ' : '',
        byPhone: unpreparedData.byPhone ? 'Т' : '',
        shopName: unpreparedData.shop.name,
        shopPhone: unpreparedData.shop.phone,
        phones: unpreparedData.phones.filter(phone => phone).join(', '),
        campaignNote: unpreparedData.notes && campaignNote ? `${campaignNote}; ` : campaignNote
    };
    const preparedData = convertUndefinedPropertiesToString({...unpreparedData, ...modifiedData});
    return preparedData;
};

function getFirstLetter(string) {
    return string !== undefined ? string.charAt(0) : '';
}

function getGuaranteedProducts(products) {
    return products.filter(product => product.guarantee > 0);
}

function convertUndefinedPropertiesToString(obj) {
    let clonedObj = {...obj};
    for (let prop in clonedObj) {
        if (typeof clonedObj[prop] == 'object' && clonedObj[prop] != null && !Array.isArray(clonedObj[prop])) {
            clonedObj[prop] = convertUndefinedPropertiesToString(clonedObj[prop])
        } else if (prop === undefined) { //replace undefined and null values to empty strings
            clonedObj[prop] = ''
        }
    }
    return clonedObj;
}

function getCampaignNoteFromProductList(products) {
    const productsWithCampaigns = products.filter(product => product.campaign.value > 0);
    const campaignsStrings = productsWithCampaigns.map(product => `Акция «${product.campaign.title}»`);
    return campaignsStrings.join('; ');
}

