import apiClient from './apiClient';

class BookTypeApi {
    getIndex() {
        let url = '/bookTypes';

        return apiClient.get(url);
    }
}

const bookTypeApi = new BookTypeApi();
export default bookTypeApi;