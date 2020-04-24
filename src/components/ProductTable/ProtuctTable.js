import './ProductTable.css';

import React, {useState} from 'react';
import Row from './ProtuctTableRow'
import FormField from 'components/Base/FormField';

//    TODO: add isExhibitionSample column;
export default function ProductTable(props) {
    const [discountRounded, setDiscountRounded] = useState(false);

    function toggleDiscountRounded() {
        setDiscountRounded(prev => !prev);
    }

    const rows = props.products.map((product, index) =>
        <Row
            // key={product.id}
            rowNumber={index + 1}
            product={product}
            onChange={updatedProps => props.onChange(index, updatedProps)}
            removeProduct={() => props.removeProduct(index)}
            discountRounded={discountRounded}
        />
    );
    return (
        <div className="ProductTable-round-discount">
            <FormField
                type='checkbox'
                label={'Округлять скидку до сотен в пользу клиента'}
                required={false}
                checked={discountRounded}
                onChange={toggleDiscountRounded}
            />
            <table className='ProductTable' border='1'>
                <thead>
                <tr>
                    <th className='ProductTable-add-product' onClick={props.addProduct}>+</th>
                    <th>№</th>
                    <th>Название</th>
                    <th>Размер</th>
                    <th>Состав</th>
                    <th>Цена</th>
                    <th>Количество</th>
                    <th>Скидка</th>
                    <th>Акция</th>
                    <th>Сумма</th>
                    <th>Гарантия, мес.</th>
                    <th>Откуда</th>
                    <th>Удалить</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        </div>
    )
}