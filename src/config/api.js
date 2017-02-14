// const BASE_URL = 'http://music.163.com/weapi'
const BASE_URL = 'http://pod.gf.com.cn/api/information/podcastserver/1.0.0'

import axios from 'axios'


// 判断元素类型
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 函数过滤
function filter_null(o) {
    for (let key in o) {
        if (o[key] == null) {
            delete o[key]
        }

        if (toType(o[key]) == 'string') {
            o[key] = o[key].trim()
            if (o[key].length == 0) {
                delete o[key]
            }
        }
    }

    return o
}

function _api_base(method, type, url, params, success, failure) {
    let conf = {
        method: method,
        url: url,
        baseURL: BASE_URL,
        withCredentials: true,
        // headers: {
        //    Referer: 'http://music.163.com/',
        // },
        // params: {
        //     encSecKey: '4773e48ef1b8b57a30ac3d5c3b4afa0609783884b7ccde852e969ab92007158b27e05d5a52ef9159a21a405bd610cd054825239590f948a73043c9bed27ad60759d9f0c557fa5d25be585f275b3ad048c2189f7353637558fff975b0ec07b20e5911d2e806beb979f6b926580f6716a4fc5e1006777571d3c06c24c2c138e96e',
        //     params: 'w1a6doIV5nUu7n0yyZR4hFLU0JDS78++S1xYr2Ir1wlHFg3aC6VYP2jFAZKGJ1Oj'
        // },
    };

    axios(conf)
    .then(function (response) {
        console.log(response)
        success(response.body)
    })
    .catch(function (error) {
        console.log(error)
        // failure(error.body)
    });
}


export default {
    get: function(url, params, success, failure) {
        return _api_base('GET', 'api', url, params, success, failure)
    },

    post: function(url, params, success, failure) {
        return _api_base('POST', 'api', url, params, success, failure)
    },

    put: function(url, params, success, failure) {
        return _api_base('PUT', 'api', BASE_URL + '/' + url, params, success, failure)
    },
    
    delete: function(url, params, success, failure) {
        return _api_base('DELETE', 'api', BASE_URL + '/' + url, params, success, failure)
    },

    getImg: function(url, params, success, failure) {
        return _api_base('GET', 'img', url, params, success, failure)
    },

    getDetailContent: function(url, params, success, failure) {
        return _api_base('GET', 'detail', url, params, success, failure)
    }
}   