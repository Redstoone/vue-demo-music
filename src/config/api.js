// import axios from 'axios'
import crypto from 'crypto'
import request from 'request'

import encrypt from './encrypt'

const music = require('./music.js')

const
    BASE_URL = 'http://192.168.56.1:8080/weapi/'


// function _api_base(method, type, url, params, success, failure) {
//     let conf = {
//         method: method,
//         url: url,
//         baseURL: BASE_URL,
//         withCredentials: true,
//         headers: {
//             'Cookie': 'appver=1.5.0.75771',
//             'Referer': 'http://music.163.com',
//         },
//         params: {
//             encSecKey: '4773e48ef1b8b57a30ac3d5c3b4afa0609783884b7ccde852e969ab92007158b27e05d5a52ef9159a21a405bd610cd054825239590f948a73043c9bed27ad60759d9f0c557fa5d25be585f275b3ad048c2189f7353637558fff975b0ec07b20e5911d2e806beb979f6b926580f6716a4fc5e1006777571d3c06c24c2c138e96e',
//             params: 'w1a6doIV5nUu7n0yyZR4hFLU0JDS78++S1xYr2Ir1wlHFg3aC6VYP2jFAZKGJ1Oj'
//         },
//     };

//     axios(conf)
//     .then(function (response) {
//         console.log(response)
//         success(response.body)
//     })
//     .catch(function (error) {
//         console.log(error)
//         // failure(error.body)
//     });
// }

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
        return new Promise(resolve => {
            const data = encrypt({
                uid,
                limit   : 1000,
                offset  : 0,
                total   : true,
                type    : period ^ 1
            });

            request.post({
                uri: BASE_URL + 'v1/play/record',
                form: {
                    params      : data.params,
                    encSecKey   : data.encSecKey
                },
                headers: {
                    'Referer' : 'http://music.163.com/'
                }
            }, (...results) => resolve(results))
        })
    },

    getList: function() {
        music.getRecord('1760687', 1).then(results => {
            console.log(results)
        })
    }
}

export default NetEase