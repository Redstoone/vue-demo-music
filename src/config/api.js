// import axios from 'axios'
import crypto from 'crypto'
import request from 'request'
import axios from 'axios'

import encrypt from './encrypt'

const music = require('./music.js')

const
    BASE_URL = 'http://192.168.56.1:8080/'


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

function httpRequest(method, uri, params='', timeout='', success, failure) {
    return new Promise(resolve => {
        let header = {
                'Accept': '*/*',
                'Accept-Encoding': 'gzip,deflate,sdch',
                'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Host': 'music.163.com',
                'Referer': 'http://music.163.com/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36'
            }

        if (method === 'Login_POST') {
            request.post(BASE_URL + uri, {
                form: params,
                headers: header
            }, (...results) => resolve(results))
        } else if (method === 'GET'){
            console.log(BASE_URL + uri)
            request.get(BASE_URL + uri, {
                headers: {
                    'Referer': 'http://music.163.com/',
                }
            }, (...results) => resolve(results))
        } else if (method === 'POST') {
            request.post(BASE_URL + uri, {
                params: JSON.stringify(params),
                headers: header
            }, (...results) => resolve(results))
        }
    })
}

const NetEase = {
    /*
    * 获取听歌排行
    * uid:
    *    用户 id
    * period:
    *    0: 一周
    *    1: 所有
    */
    getRecord: function(uid, period) {
        const data = encrypt({
            uid,
            limit   : 1000,
            offset  : 0,
            total   : true,
            type    : period ^ 1
        });

        httpRequest('Login_POST', 'v1/play/record', data)
        // .then(results => {
        //     console.log(results)
        // })
    },

    getList: function() {
        music.getRecord('6860494', 1).then(results => {
            console.log(results)
        })
        music.login('18767136845', 'May_2015').then(results => {
            console.log(results)
        })
    },

    // 用户歌单
    userPlaylist: function(uid, offset=0, limit=100) {
        let uri = 'api/user/playlist?offset='+offset+'&limit='+limit+'&uid='+uid

        httpRequest('GET', uri).then(results => {
            console.log(results)
        })
    },

    // 私人FM
    personFM: function() {
        let uri = 'api/radio/get'

        httpRequest('GET', uri).then(results => {
            console.log(results)
        })
    },

    //
    playlistClasses: function() {
        let uri = 'discover/playlist/'

        httpRequest('GET', uri).then(results => {
            console.log(results)
        })
    }
}

export default NetEase