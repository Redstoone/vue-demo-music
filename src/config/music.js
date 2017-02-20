const
    request = require('request'),
    crypto = require('crypto'),
    encrypt = require('./encrypt.js')



const
    URI = {
        record  : 'http://192.168.63.192:8080/weapi/v1/play/record',
        uri     : 'http://192.168.63.192:8080/weapi/song/enhance/player/url',
        login   : 'http://192.168.63.192:8080/weapi/login'
    }


const login = (mail, pass) => {

    const data = encrypt({
        username: mail,
        password: crypto.createHash('md5').
            update(pass).digest('hex'),
        rememberLogin: true,
        csrf_token: ''
    })

    return new Promise(resolve => {
        request.post(
            {
                uri: URI.login,
                form: {
                    params: data.params,
                    encSecKey: data.encSecKey
                },
                headers: {
                    'Referer' : 'http://music.163.com/'
                }
            },
            function(...args) {
                resolve(args)
            }
        )
    })
}

/*
* 以下接口
* 无需登录
* 即可请求
*/

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

const getRecord = (uid, period) => {
    return new Promise(resolve => {
        const data = encrypt({
            uid,
            limit   : 1000,
            offset  : 0,
            total   : true,
            type    : period ^ 1
        });

        console.log(data.params, data.encSecKey)
        request.post({
            uri: URI.record,
            form: {
                params      : data.params,
                encSecKey   : data.encSecKey
            },
            headers: {
                'Referer' : 'http://music.163.com/'
            }
        }, (...results) => resolve(results))
    })
}

/*
* 通过歌曲 id 获取 mp3 链接
* id: 歌曲 id
*/

const getUri = id => {
    return new Promise(resolve => {
        const data = encrypt({
            br          : 128000,
            csrf_token  : '',
            ids         : `[${id}]`
        })
        request.post({
            uri: URI.uri,
            form: {
                params      : data.params,
                encSecKey   : data.encSecKey
            },
            headers: {
                'Referer' : 'http://music.163.com/'
            }
        }, (...results) => resolve(results))
    })
}

module.exports = {
    login,
    getRecord,
    getUri
}


