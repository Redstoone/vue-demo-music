// import axios from 'axios'
import crypto from 'crypto'
import request from 'request'

import encrypt from './encrypt'

const music = require('./music.js')

const
    BASE_URL = 'http://192.168.63.192:8080/'


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

function _api_base(method, url, params='', timeout='', success, failure) {
    // return new Promise(resolve => {
        let 
            header = {
                'Accept': '*/*',
                'Accept-Encoding': 'gzip,deflate,sdch',
                'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Host': 'music.163.com',
                'Referer': 'http://music.163.com/search/',
                'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36'
            }, r
            
        if(method === 'Login_POST') {
            r = request.post({
                uri: BASE_URL + url,
                form: params,
                headers: {
                    'Referer' : 'http://music.163.com/'
                }
            })
            // }, (...results) => resolve(results))
        }else{
            r = request(method, BASE_URL + url).set({'Accept': 'application/json'})
            params = filter_null(params)
            if (method === 'POST' || method === 'PUT') {
                if (toType(params) == 'object') {
                    params = JSON.stringify(params)
                }
                r.send(params)
            } else if (method === 'GET' || method === 'DELETE') {
                r.query(params)
            } 

            console.log(r);
            // r.end((...results) => resolve(results))
        }
    // })
}

const NetEase = {
    /*
    * 获取听歌排行
    * uid:
    *    用户 id
    *    打开云音乐的个人主页
    *    链接里会有
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

        _api_base('Login_POST', 'v1/play/record', data)
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

    user_playlist: function(uid, offset=0, limit=100) {
        let url = 'api/user/playlist/?offset=' + offset + '&limit=' + limit + '&uid=' + uid
        console.log(uid, url)

        _api_base('GET', url)
        .then(results => {
            console.log(results)
        })
    }
}

export default NetEase