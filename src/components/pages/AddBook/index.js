import React, { useState, useContext } from 'react';

import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// Contexts
import { LoginContext } from '../../providers/LoginProvider';
import { BookTypeContext } from '../../providers/BookTypeProvider';

// Apis
import bookApi from '../../../api/bookApi';
import bookTypeApi from '../../../api/bookTypeApi';

export default function AddBook() {
    let { user } = useContext(LoginContext);
    let { bookTypes } = useContext(BookTypeContext);

    let [title, setTitle] = useState('');
    let [description, setDescription] = useState('');
    let [file, setFile] = useState(null);
    let [bookType, setBookType] = useState('');
    let [isComplete, setComplete] = useState(false);

    let onChangeTitle = (evt) => {
        let text = evt.target.value;

        setTitle(currentTitle => text);
    }

    let onChangeDescription = (evt) => {
        let text = evt.target.value;

        setDescription(currentDescription => text);
    }

    let onChangeFile = (evt) => {
        let file = evt.target.files[0];

        setFile(currentFile => file);
    }

    let onChangeBookType = (evt) => {
        let text = evt.target.value;

        setBookType(currentBookType => text);
    }

    let onSubmit = (evt) => {
        evt.preventDefault();

        let form = new FormData();
        form.append('title', title);
        form.append('description', description);
        form.append('file', file);
        bookApi.postCreate(form, user._id, bookType).then(res => {
            let { success } = res;

            if(!success) {
                throw new Error();
            }

            setComplete(currentComplete => !isComplete);
        }).catch(err => {
            console.log('Có lỗi xảy ra');
            return;
        });
    }

    return isComplete?(
        <Redirect to={{
            pathname: "/"
        }} />
    ):(
        <Form onSubmit={onSubmit}>
            <FormGroup>
                <Label for="title">Tiêu đề</Label>
                <Input type="text" name="title" id="title" placeholder="Nhập tiêu đề" onChange={onChangeTitle} value={title} />
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" id="description" onChange={onChangeDescription} value={description} />
            </FormGroup>
            <FormGroup>
                <Label for="file">Ảnh bìa</Label>
                <Input type="file" name="file" id="file" onChange={onChangeFile} />
            </FormGroup>
            <FormGroup>
                <Label for="bookType">Select</Label>
                <Input type="select" name="bookType" id="bookType" onChange={onChangeBookType}>
                    {
                        bookTypes && bookTypes.map(item => (
                            <option value={item._id}>{item.name}</option>
                        ))
                    }
                </Input>
            </FormGroup>
            <Button type="success">Thêm</Button>
        </Form>
    );
}