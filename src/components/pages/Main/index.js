import React, { useContext, useState } from 'react';

import { Link } from 'react-router-dom';
import {
    Container, Row, Col, Button, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Input, FormGroup, Label, Form
} from 'reactstrap';

// Contexts
import { BookContext } from '../../providers/BookProvider';
import { BookTypeContext } from '../../providers/BookTypeProvider';

// Apis
import bookApi from '../../../api/bookApi';
import bookTypeApi from '../../../api/bookTypeApi';

export default function Main() {
    let { books, setBook } = useContext(BookContext);
    let { bookTypes } = useContext(BookTypeContext);

    let [bookType, setBookType] = useState('');

    let onChangeBookType = (evt) => {
        let text = evt.target.value;

        setBookType(currentBookType => text);
    };

    let onSubmit = (evt) => {
        evt.preventDefault();

        // debugger;
        bookApi.getIndexByBookType(bookType).then(res => {
            let { success, books: newBooks } = res;

            if(!success || !newBooks) {
                throw new Error();
            }

            setBook(curentBooks => newBooks);
        }).catch(err => {
            console.log('Có lỗi xảy ra');
            return;
        })
    }

    return (
        <div>
            <h1>Books</h1>
            <Link className="btn btn-primary" to="/addBook">Thêm sách</Link>

            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label for="bookType">Loại sách</Label>
                    <Input type="select" name="bookType" id="bookType" onChange={onChangeBookType}>
                        {
                            bookTypes && bookTypes.map(item => (
                                <option value={item._id}>{item.name}</option>
                            ))
                        }
                    </Input>
                </FormGroup>
                <Button color="primary">Tìm</Button>
            </Form>

            <Row>
                {
                    books.map(item => (
                        <Col sm="12" md="6" lg="4">
                            <Card>
                                <CardImg top width="100%" src={`http://localhost:5000/${item.image}`} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardText>{item.text}</CardText>
                                    <Button>Thêm</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
}