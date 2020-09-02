import React from 'react';

import { Container } from 'reactstrap';

import Header from '../Header';

export default function Default({ children, ...rest }) {
    return (
        <div>
            <Header />
            <Container>
                {
                    children
                }
            </Container>
        </div>
    );
}