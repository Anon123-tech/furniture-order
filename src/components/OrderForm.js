import React, {useRef} from 'react';
import FormField from 'components/Base/FormField';
import MaskedFormField from 'react-text-mask';
import './OrderForm.css'

//    TODO: disable autocomplete on mostly unique fields;
//    TODO: add the block to display validation errors;
export default function OrderForm(props) {

    const deliveryAddressRef = useRef(null);

    const {
        order,
        shop,
        total,
        prepaymentInRub,
        prepaymentInPercentage,
        createOrderDoc,
        updateOrder,
        handlePercentageChange,
        handleRubleChange
    } = props;

    function setSelfDelivery(event) {
        event.preventDefault();
        const {value} = event.target;
        const fakeEventTarget = {name: 'deliveryAddress', value};
        const fakeEvent = {target: fakeEventTarget};
        // debugger;
        updateOrder(fakeEvent);
        deliveryAddressRef.current.focus();
    }


    let phonesFormFields = order.phones.map(function (value, key) {
        let requiredProp = !key; // if the first item
        return (
            <FormField
                inputComponent={MaskedFormField}
                label={`Телефон покупателя ${key + 1}`}
                required={requiredProp}
                name='phones'
                key={key}
                value={value}
                mask={['8', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                onChange={(event) => updateOrder(event, key)}
            />
        )
    });


    // debugger;
    return (

        <form className='OrderForm' onSubmit={createOrderDoc}>
            <FormField
                name='shopName'
                type="hidden"
                value={shop.name}
            />
            <FormField
                name='shopPhone'
                type="hidden"
                value={shop.phone}
            />
            <FormField
                label='Телефонный заказ'
                name='byPhone'
                required={false}
                type="checkbox"
                value={order.byPhone}
                onChange={updateOrder}
            />
            <FormField
                label='Исполнитель'
                name='performer'
                value={order.performer}
                onChange={updateOrder}
                autoComplete='on'
            />
            <FormField
                label='Номер счета-заказа'
                name='orderNumber'
                type='number'
                value={order.orderNumber}
                min='1'
                onChange={updateOrder}
            />
            <FormField
                label='Дата оформления'
                name='purchaseDate'
                value={order.purchaseDate}
                type='date'
                onChange={updateOrder}
            />
            <FormField
                label='Срок исполнения по'
                name='completionDate'
                type='date'
                value={order.completionDate}
                onChange={updateOrder}
            />
            <FormField
                label='Фамилия покупателя'
                name='customerLastName'
                value={order.customerLastName}
                onChange={updateOrder}
            />
            <FormField
                label='Имя покупателя'
                name='customerFirstName'
                value={order.customerFirstName}
                onChange={updateOrder}
                autoComplete='on'
            />
            <FormField
                label='Отчество покупателя'
                name='customerPatronymic'
                required={false}
                value={order.customerPatronymic}
                onChange={updateOrder}
                autoComplete='on'
            />
            <FormField
                ref={deliveryAddressRef}
                label='Адрес доставки'
                name='deliveryAddress'
                value={order.deliveryAddress}
                onChange={updateOrder}
                autoComplete='on'
            />
            <button
                className='OrderForm-button'
                value='САМОВЫВОЗ ИЗ МАГАЗИНА № '
                onClick={setSelfDelivery}>
                САМОВЫВОЗ
            </button>
            {phonesFormFields}
            <FormField
                label='Предоплата, %'
                name='prepaymentInPercentage'
                type='number'
                min={0}
                max={100}
                value={prepaymentInPercentage}
                onChange={handlePercentageChange}
            />
            <FormField
                label='Предоплата, руб.'
                name='prepaymentInRub'
                type='number'
                min={0}
                max={total}
                value={prepaymentInRub}
                onChange={handleRubleChange}
            />
            <FormField
                label='Рассрочка'
                name='credit'
                type='checkbox'
                required={false}
                value={order.credit}
                onChange={updateOrder}
            />
            <FormField
                label='Терминал'
                name='cashless'
                type='checkbox'
                required={false}
                value={order.cashless}
                onChange={updateOrder}
            />
            <FormField
                label='Примечания'
                name='notes'
                required={false}
                value={order.notes}
                onChange={updateOrder}
                autoComplete='on'
            />
            <button
                className='OrderForm-button'>
                Создать документ
            </button>
        </form>

    );
}