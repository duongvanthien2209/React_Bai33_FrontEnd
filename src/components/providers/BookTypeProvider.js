import React, { useState, useEffect } from 'react';

import bookTypeApi from '../../api/bookTypeApi';

export const BookTypeContext = React.createContext();

export default function ({ children }) {
    let [bookTypes, setBookTypes] = useState([]);
    let [currentBookType, setCurrentBookType] = useState('');

    useEffect(() => {
        bookTypeApi.getIndex().then(res => {
            // debugger;
            let { success, bookTypes: newBookTypes } = res;

            if (!success || !newBookTypes) {
                throw new Error();
            }

            setBookTypes(currentBookTypes => newBookTypes);
        }).catch(err => {
            console.log('Có lỗi xảy ra');
            return;
        })
    }, []);

    return (
        <BookTypeContext.Provider value={{ bookTypes, setBookTypes, currentBookType, setCurrentBookType }}>
            {
                children
            }
        </BookTypeContext.Provider>
    )
}