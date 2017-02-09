const BASE_URL = 'http://gank.io/api'

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
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType: 'json'
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
        return _api_base('GET', 'api', BASE_URL + '/' + url, params, success, failure)
    },

    post: function(url, params, success, failure) {
        return _api_base('POST', 'api', BASE_URL + '/' + url, params, success, failure)
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