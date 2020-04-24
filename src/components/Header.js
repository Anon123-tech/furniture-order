import React from 'react';
import './Header.css';

export default function Header(props) {
    return (
        <header className='Header'>
            <h1>{props.title}</h1>
            <h2>{props.shopPhone}</h2>
        </header>
    );

}