import React, { useState, useEffect } from 'react';

// Apis
import bookApi from '../../api/bookApi';

// Contexts
import bookTypeContext from '../providers/BookTypeProvider';

export const BookContext = React.createContext();

export default function BookProvider({children}) {
    let [books, setBook] = useState([]);

    useEffect(() => {
        bookApi.getIndex().then(res => {
            // console.log(res);
            let { success, books: newBooks } = res;
            if(!success || !newBooks) {
                throw new Error();
            }

            setBook(currentBooks => newBooks);
        })
    },[]);

    return (
        <BookContext.Provider value={{ books, setBook }}>
            {
                children
            }
        </BookContext.Provider>
    )
}