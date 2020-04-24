import React, {Fragment, useEffect, useMemo, useState} from 'react';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import Header from './Header';
import OrderForm from './OrderForm';
import ProductTable from "./ProductTable/ProtuctTable";
import createProduct from "service/createProduct";
import debounce from "debounce";
import tryConvert from "service/tryConvert";
import toRubles from "service/toRubles";
import toPercentage from "service/toPercentage";
import {useResidue} from "hook/useResidue";
import TotalSection from './TotalSection';
import generateDoc from "service/generateDoc";
import formatOrderData from 'service/docx-templates/order/formatOrderData';
import api from 'service/api/ordering-api';
import {defaultProductTable, ProductTableContext} from 'context/product-table-context'

//    TODO: set up keyboard navigation;
//    TODO: markup the page;
//    TODO: add credit.docx generating;
//    TODO: refactor project structure;
//    TODO: write tests;

function App() {
    const [shop, setShop] = useState({
        name: '',
        phone: ''
    });
    const [campaignsList, setCampaignsList] = useState(defaultProductTable.campaigns.list);
    const [productLocationList, setProductLocationList] = useState(defaultProductTable.productLocationList);

    useEffect(() => {
        async function fetchData() {
            const {shop, productTable} = await api.fetchInitialData();
            setShop(shop);
            console.log(productTable);

            const {campaigns, shopList, defaultProductLocations} = productTable;
            setCampaignsList(campaigns);

            const locationsInShops = shopList.map(shopName => (
                {
                    title: `Из магазина № ${shopName}`,
                    value: `М${shopName}`
                }
            ));
            const locations = defaultProductLocations.concat(locationsInShops);
            setProductLocationList(locations);
        }

        fetchData();
    }, []);

    const productTableContext = useMemo(() => ({
        campaigns: {
            list: campaignsList,
            groupBy: defaultProductTable.campaigns.groupBy
        },
        productLocationList,
    }), [campaignsList, productLocationList]);

    const [order, setOrder] = useState(() => ({
        byPhone: false,
        performer: '',
        orderNumber: '',
        purchaseDate: new Date().toISOString().split('T').shift(), //today
        completionDate: '',
        customerLastName: '',
        customerFirstName: '',
        customerPatronymic: '',
        deliveryAddress: '',
        phones: Array(3).fill(''), //3 empty phone numbers
        credit: false,
        cashless: false,
        notes: ''
    }));

    function updateOrder(event, key = undefined) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        debounce(function () {
            setOrder(prevOrder => {
                if (key === undefined) {
                    return {
                        ...prevOrder,
                        [name]: value
                    }
                } else {
                    let copiedArrayProp = Array.from(prevOrder[name]);
                    copiedArrayProp.splice(key, 1, value);
                    return {
                        ...prevOrder,
                        [name]: copiedArrayProp
                    }
                }
            });
        }, 0)()
    }

    const byPhone = order.byPhone ? 'Т' : '';
    const title = `Счет-заказ № ${shop.name}-${order.orderNumber}${byPhone}`;

    const [products, setProducts] = useState(() => [createProduct()]);

    useEffect(() => {
        document.title = title;
    });

    function addProduct(product = createProduct()) {
        setProducts((prevProducts) => {

            const newProducts = [...prevProducts, product];
            // debugger;
            return newProducts;
        });
    }

    function removeProduct(index) {
        setProducts(prevProducts => {
                if (prevProducts.length > 1) { //if there's more than one product
                    let copiedProducts = Array.from(prevProducts);
                    copiedProducts.splice(index, 1);
                    return copiedProducts;
                } else {
                    return prevProducts;
                }
            }
        )
    }


    function updateProducts(index, updatedProps) {
        debounce(function () {
            setProducts(prevProducts => {
                const updatedProduct = {
                    ...prevProducts[index],
                    ...updatedProps
                };
                // debugger
                let copiedProducts = Array.from(prevProducts);
                copiedProducts.splice(index, 1, updatedProduct);
                console.log(copiedProducts);
                return copiedProducts;
            });
        }, 0)();
    }

    const [total, setTotal] = useState(0);
    const [prepayment, setPrepayment] = useState({
        unit: 'p',
        value: 100
    });

    function handlePercentageChange(event) {
        let {value} = event.target;
        value = +value;
        const prepayment = {
            unit: 'p',
            value
        };
        setPrepayment(() => {
            if (value > 100) { //if more than 100%, set 100%
                return {
                    ...prepayment,
                    value: 100
                }
            }
            return prepayment
        })
    }

    function handleRubleChange(event) {
        let {value} = event.target;
        value = +value;
        const prepayment = {
            unit: 'r',
            value
        };
        setPrepayment(prevPrepayment => {
            if (total < value || total === 0) {
                return prevPrepayment;
            } else {
                return prepayment;
            }
        });
    }

    const prepaymentInRub = useMemo(() => prepayment.unit === 'p' ? tryConvert(prepayment.value, total, toRubles) : prepayment.value, [prepayment, total]);
    const prepaymentInPercentage = useMemo(() => prepayment.unit === 'r' ? tryConvert(prepayment.value, total, toPercentage) : prepayment.value, [prepayment, total]);

    const residue = useResidue(total, prepaymentInRub);


    useEffect(() => { // re-calculate total on every `products` update and set prepayment to percentage-based
        const total = +(products.length > 0 && products.reduce(function (acc, cur) {
            return acc + cur.sum;
        }, 0));
        setTotal(total);
        setPrepayment({
            unit: 'p',
            value: prepaymentInPercentage
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    function createOrderDoc(event) {
        event.preventDefault();
        try {
            const data = {
                ...order,
                shop,
                products,
                total,
                residue,
                prepaymentInRub,
                prepaymentInPercentage
            };
            const orderData = formatOrderData(data);
            console.log(orderData);
            generateDoc(orderData, 'docx/account_order.docx', title)
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <Fragment>
            <ErrorBoundary>
                <Header
                    title={title}
                    shopPhone={shop.phone}
                />
                <ProductTableContext.Provider value={productTableContext}>
                    <OrderForm
                        shop={shop}
                        order={order}
                        updateOrder={updateOrder}

                        total={total}
                        residue={residue}
                        prepaymentInRub={prepaymentInRub}
                        prepaymentInPercentage={prepaymentInPercentage}

                        handlePercentageChange={handlePercentageChange}
                        handleRubleChange={handleRubleChange}
                        createOrderDoc={createOrderDoc}
                    />
                    <ProductTable
                        onChange={updateProducts}
                        addProduct={(event, product) => addProduct(product)}
                        removeProduct={removeProduct}
                        products={products}
                    />
                    <TotalSection
                        total={total}
                        prepaymentInRub={prepaymentInRub}
                        residue={residue}
                    />
                </ProductTableContext.Provider>
            </ErrorBoundary>
        </Fragment>
    );
}

export default App;
