
const HOST = 'https://h.nimingban.com';
const DEFAULT_HEADERS = {
    'User-Agent': 'HavfunClient-平台'
};

export default class AnoBoos {
    static _request(method, path, headers) {
        return fetch(`${HOST}/${path}`, {
            method: method || 'GET',
            headers: {
                ...headers,
                ...DEFAULT_HEADERS
            },
        });
    }

    static getForumList() {
        return AnoBoos._request('GET', '/Api/getForumList')
            .then((response) => response.json());
    }

    static showf(id, page = 1) {
        return AnoBoos._request('GET', '/Api/showf')
            .then((response => response.json()));
    }
}