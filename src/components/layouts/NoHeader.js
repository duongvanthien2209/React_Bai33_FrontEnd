import React from 'react';

import { Container } from 'reactstrap'; 

export default function NoHeader({ children, ...rest }) {
    return (
        <Container>
            {
                children
            }
        </Container>
    );
}