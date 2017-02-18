// import axios from 'axios'
import crypto from 'crypto'
import request from 'request'
import axios from 'axios'

import encrypt from './encrypt'

const music = require('./music.js')

const
    BASE_URL = 'http://192.168.56.1:8080/'


function httpRequest(method, uri, data='', timeout='', success, failure) {

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
        return new Promise(resolve => {
            request.post(
                {
                    uri: BASE_URL + uri,
                    form: {
                        params: data.params,
                        encSecKey: data.encSecKey
                    },
                    headers: {
                        'Referer' : 'http://music.163.com/'
                    }
                },
                function(...results) {
                    resolve(results)
                }
            )
        })
    } else if (method === 'GET'){
        return new Promise(resolve => {
            request.get(BASE_URL + uri, {
                headers: {
                    'Referer': 'http://music.163.com/',
                }
            }, (...results) => resolve(results))
        })
    } else if (method === 'POST') {
        console.log(JSON.stringify(data));
        return new Promise(resolve => {
            request.post(BASE_URL + uri, {
                body: JSON.stringify(data),
                headers: header
            }, (...results) => resolve(results))
        })
    }
}

const NetEaseAPI = {

    // 登录 ok
    login: function(username, password) {
        let uri = 'weapi/login',
            data = encrypt({
                username: username,
                password: crypto.createHash('md5').
                    update(password).digest('hex'),
                rememberLogin: true,
                csrf_token: ''
            })

        httpRequest('Login_POST', uri, data).then(results => {
            console.log(results)
        })

        // music.login(username, password).then(results => {
        //     console.log(results)
        // })
    },

    // 手机登录
    /*phoneLogin: function(username, password) {
        let
            data = encrypt({
                username: username,
                password: crypto.createHash('md5').
                    update(password).digest('hex'),
                rememberLogin: true,
                csrf_token: ''
            }),
            uri = 'weapi/login'

        httpRequest('Login_POST', uri, data).then(results => {
            console.log(results)
        })
    }*/

    // 每日签到    移动端(0) PC端(1)  *(type)* 403
    dailySignin: function(type) {
        let uri = 'weapi/point/dailyTask',
            data = encrypt({
                type: type
            })

        httpRequest('Login_POST', uri, data).then(results => {
            console.log(results)
        })
    },


    // 用户歌单 ok
    userPlaylist: function(uid, offset=0, limit=100) {
        let uri = 'api/user/playlist?offset='+offset+'&limit='+limit+'&uid='+uid

        httpRequest('GET', uri).then(results => {
            console.log(results)
        })
    },

    // 私人FM 403
    personFM: function() {
        let uri = 'api/radio/get'

        httpRequest('GET', uri).then(results => {
            console.log(results)
        })
    },

    //  FM like
    fmLike: function(songid, like=true, time=25, alg='itembased') {
        let uri = 'api/radio/like?alg='+alg+'&trackId='+songid+'&like='+like+'&time='+time

        httpRequest('GET', uri).then(results => {
            console.log(results)
        })
    },

    // FM trash
    fmTrash: function(songid, time=25, alg='RT') {
        let uri = 'api/radio/trash/add?alg='+alg+'&songId='+songid+'&time='+time

        httpRequest('GET', uri).then(results => {
            console.log(results)
        })
    },

    // 搜索    单曲(1)，歌手(100)，专辑(10)，歌单(1000)，用户(1002)  *(type)*
    search: function(s, stype=1, offset=0, total='true', limit=60) {
        let uri = 'weapi/search/suggest/web',
            data = {
                's': s,
                'type': stype,
                'offset': offset,
                'total': total,
                'limit': limit
            }

        httpRequest('login_POST', uri, data).then(results => {
            console.log(results)
        })
    },

    unpowMod: function(encSecKey) {
        console.log(encrypt.rsa('asdfghjklqwertyu'))

        console.log(encrypt.dePowMod(encrypt.rsa('asdfghjklqwertyu')))
    },

    // 分类歌单
    playlistClasses: function() {
        let uri = 'discover/playlist/'

        httpRequest('GET', uri).then(results => {
            console.log(results)
        })
    }
}

export default NetEaseAPI