import React, { useState, useContext } from 'react';

import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// Contexts
import { LoginContext } from '../../providers/LoginProvider';

import userApi from '../../../api/userApi';

export default function Register() {
    let { isLogin } = useContext(LoginContext);
    let [ isComplete, setComplete ] = useState(false);
    let [ email, setEmail ] = useState('');
    let [ password, setPassword ] = useState('');
    let [ name, setName ] = useState('');

    let onChangeEmail = (evt) => {
        let text = evt.target.value;

        setEmail(currentEmail => text);
    }

    let onChangePassword = (evt) => {
        let text = evt.target.value;

        setPassword(currentPassword => text);
    }

    let onChangeName = (evt) => {
        let text = evt.target.value;

        setName(currentName => text);
    }

    let onSubmit = (evt) => {
        evt.preventDefault();

        userApi.create({ name, email, password }).then(res => {
            debugger;
            let { success } = res;

            if(!success) {
                throw new Error();
            }

            setComplete(currentIsComplete => !isComplete);
        }).catch(err => {
            console.log('Có lỗi xảy ra');
            return;
        })
    }

    return isLogin?(
        <Redirect to={{
            pathname: "/"
        }} />
    ):(!isComplete?(
        <Form onSubmit={onSubmit}>
            <FormGroup>
                <Label for="name">Họ Tên</Label>
                <Input type="text" name="name" id="name" placeholder="Nhập họ tên" onChange={onChangeName} value={name} />
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Nhập email" onChange={onChangeEmail} value={email} />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="Nhập mật khẩu" onChange={onChangePassword} value={password} />
            </FormGroup>
            <Button type="success">Đăng Ký</Button>
        </Form>
    ):(
        <Redirect to={{
            pathname: '/login'
        }} />
    ));
}