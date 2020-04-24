import './ProductTableRow.css';

import React, {useContext, useEffect, useMemo} from 'react';
import SelectInput from 'components/Base/SelectInput';
import Cell from './ProtuctTableCell'
import {ProductTableContext} from 'context/product-table-context'


function getCoeffFromPercent(percent) {
    return 1 - parseInt(percent) / 100;
}

function isDiscountInPercent(discount) {
    return ~discount.indexOf('%') ? true : false;
}

function roundToHundreds(number) {
    return Math.floor(number / 100) * 100
}

function calculateProductSum({price, number, discount, campaign, discountRounded}) {
    const production = price * number;
    const discountInPercent = isDiscountInPercent(discount);
    const discountedProd = discountInPercent ?
        production * getCoeffFromPercent(discount) :
        production - (parseInt(discount) || 0); //the first discount
    const twiceDiscountedProd = Math.round(discountedProd * getCoeffFromPercent(campaign.value)); //the second discount
    const sum = discountInPercent && discountRounded ? roundToHundreds(twiceDiscountedProd) : twiceDiscountedProd;
    return sum > 0 ? sum : 0;
}

export default function ProductTableRow(props) {
    const {product, rowNumber, discountRounded, onChange, removeProduct} = props;

    const productTableContext = useContext(ProductTableContext);

    const {list: campaignsList, groupBy: campaignsGroupBy} = productTableContext.campaigns;
    console.dir(campaignsList);
    const productLocationList = productTableContext.productLocationList;
    console.dir(productLocationList)

    const campaignsFlatted = useMemo(() => campaignsList.flatMap(campaign => campaign[campaignsGroupBy]), [campaignsList, campaignsGroupBy]);
    console.dir(campaignsFlatted);

    // const locations = useMemo(() => productLocationList.map(location => location), []);
    function updateProduct(column, value) {
        onChange({
            [column]: value
        });
    }

    useEffect(() => {
        updateProduct('sum', calculateProductSum({...product, discountRounded}))
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        product.price,
        product.number,
        product.discount,
        product.campaign,
        discountRounded
    ]);

    return (
        <tr>
            <Cell
                colSpan={2}
                contentEditable={false}
                value={rowNumber}
            />
            <Cell

                value={product.name}
                onChange={value => updateProduct('name', value)}
            />
            <Cell

                value={product.size}
                onChange={value => updateProduct('size', value)}
            />
            <Cell

                value={product.content}
                onChange={value => updateProduct('content', value)}
            />
            <Cell

                value={product.price}
                onChange={value => updateProduct('price', value)}
            />
            <Cell

                value={product.number}
                onChange={value => updateProduct('number', value)}
            />
            <Cell

                value={product.discount}
                onChange={value => updateProduct('discount', value)}
            />
            <td>
                <SelectInput
                    selected={product.campaign.value}
                    options={campaignsList}
                    groupBy={campaignsGroupBy}
                    onChange={event => {
                        const item = campaignsFlatted.find(campaign => {
                            return campaign.title === event.target.value
                        });
                        updateProduct('campaign', item)
                    }}
                />
            </td>
            <td>{product.sum}</td>
            <Cell
                value={product.guarantee}
                onChange={value => updateProduct('guarantee', value)}
            />
            <td>
                <SelectInput
                    selected={product.location}
                    options={productLocationList}
                    onChange={event => {
                        const item = productLocationList.find(location => {
                            return location.title === event.target.value
                        });
                        updateProduct('location', item)
                    }}

                />
            </td>
            <td
                className='product-table-button remove-product'
                onClick={removeProduct}
            >Удалить
            </td>
        </tr>
    )
}