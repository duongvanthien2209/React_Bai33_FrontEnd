import apiClient from './apiClient';

class BookApi {
    getIndex(_page = 1) {
        let url = `/books?_page=${_page}`;

        return apiClient.get(url);
    }

    getIndexByBookType(_bookType, _page = 1) {
        // debugger;
        let url = `/books/bookType?_bookType=${_bookType}&_page=${_page}`;
        return apiClient.get(url);
    }

    postCreate(formData, _userId, _bookType) {
        let url = `/books/${_userId}/${_bookType}/create`;

        return apiClient.post(url, formData);
    }
}

const bookApi = new BookApi();
export default bookApi;