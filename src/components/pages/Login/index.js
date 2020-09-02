import React, { useState, useContext } from 'react';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom';

// Contexts
import { LoginContext } from '../../providers/LoginProvider';

// Apis
import userApi from '../../../api/userApi';

export default function Login() {
    let { isLogin, setLogin, setUser } = useContext(LoginContext);
    let [ email, setEmail ] = useState('');
    let [ password, setPassword ] = useState('');

    let onChangeEmail = (evt) => {
        let text = evt.target.value;

        setEmail(currentEmail => text);
    }

    let onChangePassword = (evt) => {
        let text = evt.target.value;

        setPassword(currentPassword => text);
    }

    let onSubmit = (evt) => {
        evt.preventDefault();

        userApi.login({ email, password }).then(res => {
            // debugger;
            let { success, user } = res;

            if(!success || !user) {
                throw new Error();
            }

            setLogin(currentLogin => !isLogin);
            setUser(currentUser => user);
        }).catch(err => {
            console.log('Có lỗi xảy ra');
            return;
        });
    }

    return isLogin?(
        <Redirect to={{
            pathname: '/'
        }} />
    ):(
        <Form onSubmit={onSubmit}>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Nhập email" onChange={onChangeEmail} value={email} />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="Nhập mật khẩu" onChange={onChangePassword} value={password} />
            </FormGroup>
            <Button color="success">Đăng nhập</Button>
        </Form>
    );
}