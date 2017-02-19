import crypto from 'crypto'
import Big from 'big.js'

const
    modulus = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7',
    nonce = '0CoJUm6Qyw8W8jud',
    pubKey = '010001'

// 转换成十六进制
Big.prototype.toHex = function() {
    let
        v = new Big(this),
        r = []

    while (v.gte(16)) {
        r.push(v.mod(16).toString())
        v = v.div(16).round(0, 0)
    }

    r.push(v.toString())
    while (r.length < 256) r.push(0)
    return r.map(e => {
        e == 10 ? e = 'a' : null
        e == 11 ? e = 'b' : null
        e == 12 ? e = 'c' : null
        e == 13 ? e = 'd' : null
        e == 14 ? e = 'e' : null
        e == 15 ? e = 'f' : null
        return e
    }).reverse().join('')
}

Big.prototype.toDecimal = function() {

}


const powMod = (i, e, m) => {
    let d = new Big(1)
    i = i.mod(m)
    for (; e > 0; e >>= 1) {
        if (e & 1) d = d.mul(i).mod(m)
        i = i.pow(2).mod(m)
    }
    return d
}

const dePowMod = (rsaCode) => {
    debugger
    rsaCode =new Big(parseInt(rsaCode, 16))
    let m = new Big(parseInt(modulus, 16)),
        i = new Big(1),
        x = i

    do {
        x = m.mul(i).plus(rsaCode).sqrt();
        i = i.pow(2)
    } while (x === parseInt(x))

    return x
}

// RSA加密
const rsa = secKey => {
    const
        radix = 16,
        buf = [],
        size = new Big(Math.pow(radix, 4))
    let n = new Big(0)

    secKey = secKey.toString().split('')
    for (let i = 0; i < secKey.length; i++) {
        secKey[i] = secKey[i].charCodeAt(0)
    }
    for (let i = 0; i <= secKey.length;) {
        buf.push((secKey[i++] << 0) + (secKey[i++] << 8))
    }
    for (let e, i = 0; i < buf.length; i++) {
        e = new Big(buf[i])
        e = e.mul(size.pow(i))
        n = n.plus(e)
    }
    n = n.toString()
    return powMod(new Big(n), 65537, new Big('157794750267131502212476817800345498121872783333389747424011531025366277535262539913701806290766479189477533597854989606803194253978660329941980786072432806427833685472618792592200595694346872951301770580765135349259590167490536138082469680638514416594216629258349130257685001248172188325316586707301643237607')).toHex()
}

const split = s => {
    const arr = []
    for (let i = 0; i < s.length; i += 2) {
        arr.push(parseInt(s.substr(i, 2), 16))
    }
    return arr
}

// 随机数生成
const randomString = len => {
    const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let char, str = ''

    for (let i=0; i<len; i++) {
        char = Math.floor(Math.random() * alphabets.length),
        str += alphabets.charAt(char);
    }
    return str
}

// AES加密
const aes = (val, secKey) => {
    const cipher = crypto.createCipheriv('aes-128-cbc', secKey, '0102030405060708')

    return `${cipher.update(val, 'utf8', 'base64')}${cipher.final('base64')}`
}

const encrypt = data => {
    const secKey = randomString(16)

    return {
        params: aes(aes(JSON.stringify(data), nonce), secKey),
        encSecKey: rsa(secKey, pubKey, modulus)
    }
}

module.exports = {
    dePowMod,
    rsa,
    powMod,
    encrypt
}