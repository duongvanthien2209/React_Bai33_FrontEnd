import apiClient from './apiClient';

class UserApi {
    create(data) {
        return apiClient.post('/users', data);
    }

    login(data) {
        return apiClient.post('/users/login', data);
    }
}

const userApi = new UserApi();
export default userApi;