
const HOST = 'https://h.nimingban.com';

const CDN_PATH = 'http://cdn.ovear.info:9009';
const THUMB_PATH = '/thumb';
const IMAGE_PATH = '/image';

const DEFAULT_HEADERS = {
    // 'User-Agent': 'HavfunClient-平台'
};

export default class AnoBBS {
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
        return AnoBBS._request('GET', '/Api/getForumList')
            .then((response) => response.json())
            .then((response) => {
                let forums = [];
                response.forEach((item) => {
                    forums = forums.concat(item.forums);
                });

                return forums;
            });
    }

    static showf(id, page = 1) {
        return AnoBBS._request('GET', `/Api/showf?id=${id}&page=${page}`)
            .then((response => response.json()));
    }

    static thread(id, page = 1){
        return AnoBBS._request('GET', `/Api/thread?id=${id}&page=${page}`)
            .then(response => response.json());
    }

    static getThumbImage(imageUri, ext){
        return `${CDN_PATH}${THUMB_PATH}/${imageUri}${ext}`;
    };

    static getImage(imageUri, ext){
        return `${CDN_PATH}${IMAGE_PATH}/${imageUri}${ext}`;
    }
}