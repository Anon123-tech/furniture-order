import React from 'react';

export const defaultProductTable = {
    campaigns: {
        groupBy: 'values',
        list: []
    },
    productLocationList: [],
};

export const ProductTableContext = React.createContext(
    defaultProductTable // default value
);