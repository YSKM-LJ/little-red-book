// C：window.mnsv2(u, m, w)
// u：api + 请求体
// m：md5(api + 请求头)
// w：md5(api)

require("./env_2.js")
require("./js_code.js")

const CryptoJS = require('crypto-js');

function MD5(s) {
    return CryptoJS.MD5(s).toString()
}

var u = [
    "Z",
    "m",
    "s",
    "e",
    "r",
    "b",
    "B",
    "o",
    "H",
    "Q",
    "t",
    "N",
    "P",
    "+",
    "w",
    "O",
    "c",
    "z",
    "a",
    "/",
    "L",
    "p",
    "n",
    "g",
    "G",
    "8",
    "y",
    "J",
    "q",
    "4",
    "2",
    "K",
    "W",
    "Y",
    "j",
    "0",
    "D",
    "S",
    "f",
    "d",
    "i",
    "k",
    "x",
    "3",
    "V",
    "T",
    "1",
    "6",
    "I",
    "l",
    "U",
    "A",
    "F",
    "M",
    "9",
    "7",
    "h",
    "E",
    "C",
    "v",
    "u",
    "R",
    "X",
    "5"
]

function tripletToBase64(e) {
    return u[e >> 18 & 63] + u[e >> 12 & 63] + u[e >> 6 & 63] + u[63 & e]
}

function encodeChunk(e, a, s) {
    for (var u, m = [], w = a; w < s; w += 3)
        u = (e[w] << 16 & 0xff0000) + (e[w + 1] << 8 & 65280) + (255 & e[w + 2]),
            m.push(tripletToBase64(u));
    return m.join("")
}

function b64Encode(e) {
    for (var a, s = e.length, m = s % 3, w = [], C = 16383, R = 0, P = s - m; R < P; R += C)
        w.push(encodeChunk(e, R, R + C > P ? P : R + C));
    return 1 === m ? (a = e[s - 1],
        w.push(u[a >> 2] + u[a << 4 & 63] + "==")) : 2 === m && (a = (e[s - 2] << 8) + e[s - 1],
        w.push(u[a >> 10] + u[a >> 4 & 63] + u[a << 2 & 63] + "=")),
        w.join("")
}

function encodeUtf8(e) {
    for (var a = encodeURIComponent(e), s = [], u = 0; u < a.length; u++) {
        var m = a.charAt(u);
        if ("%" === m) {
            var w = parseInt(a.charAt(u + 1) + a.charAt(u + 2), 16);
            s.push(w),
                u += 2
        } else
            s.push(m.charCodeAt(0))
    }
    return s
}


function get_xs(data) {
    // data = {"keyword":"健身","page":1,"page_size":20,"search_id":"2ghh2htz1bqjahrnw0arz","sort":"general","note_type":0,"ext_flags":[],"geo":"","image_formats":["jpg","webp","avif"],"message_id":"sending"}
    var e = "/api/sns/web/v2/search/notes"
    var u = `/api/sns/web/v2/search/notes` +`${JSON.stringify(data)}`
    var m = MD5([u].join(""))
        , w = MD5(e)
        , C = window.mnsv2(u, m, w)
        , P = {
        x0: "4.3.5",
        x1: "xhs-pc-web",
        x2: "Windows",
        x3: C,
        x4: "object"
    };
    // console.log(P)
    x_s = "XYS_" + b64Encode(encodeUtf8(JSON.stringify(P)))
    return x_s
}

// get_xs()
// console.log(get_xs())
// console.log(get_xs().length)



