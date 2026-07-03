"""
经过对比发现变动参数有：
    headers:   x-b3-traceid   x-s   x-s-common   x-t   x-xray-traceid
    cookies:   loadts   websectiga   sec_poison_id
但是经过多次删减参数请求发现只有一个参数 x-s 是被检测的
"""

import requests
import json
import execjs

data = {
    "keyword": "手机",
    "page": 2,
    "page_size": 20,
    "search_id": "2gh6vz6bs40ilotdox41x@2gh6w09xlxzhn0pd5kf84", # 会变
    "sort": "general",
    "note_type": 0,
    "ext_flags": [],
    "filters": [
        {
            "tags": [
                "general"
            ],
            "type": "sort_type"
        },
        {
            "tags": [
                "不限"
            ],
            "type": "filter_note_type"
        },
        {
            "tags": [
                "不限"
            ],
            "type": "filter_note_time"
        },
        {
            "tags": [
                "不限"
            ],
            "type": "filter_note_range"
        },
        {
            "tags": [
                "不限"
            ],
            "type": "filter_pos_distance"
        }
    ],
    "geo": "",
    "image_formats": [
        "jpg",
        "webp",
        "avif"
    ],
    "message_id": "sending"
}

with open('./x-s.js', 'r', encoding='utf-8') as f:
    ctx = execjs.compile(f.read())
    x_s = ctx.call("get_xs", data)
print(x_s)


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json;charset=UTF-8",
    "origin": "https://www.xiaohongshu.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.xiaohongshu.com/",
    "sec-ch-ua": "\"Chromium\";v=\"148\", \"Google Chrome\";v=\"148\", \"Not/A)Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36",
    # "x-b3-traceid": "ceeb336cbf6f2f07", # 变
    "x-s": str(x_s)
    # "x-s": "XYS_2UQhPsHCH0c1PUhMHjIj2erjwjQhyoPTqBPT49pjHjIj2eHjwjQgynEDJ74AHjIj2ePjwjQTJdPIPAZlg94aGLTlGfRFnD+IGA4NaLEbzemk8BE9pMbSp7QawepnL04x2bSo/rDUy0bA+7iF8rPI8Fbj2fY9/9TFLgSI+sTs4n8iGAmpaBqILSzCPFM8pDiFJSQynpG7JezVNFPI4S8Qapr3LoQGanc3qS8D4/zL8FTmPrkHaMY/PrTP4pzePn8+c9EIqMQCLDkcpnbLP9ls+rT/Jfznnfl0yLLIaSQQyAmOarEaLSz+qApga0WlyAby4SbdPemxJpD7/fMBpjHVHdWFH0ijJ9Qx8n+FHdF=",
    # "x-s-common": "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",
    # 上面两个参数也变
    # "x-t": "1780987293024", # 时间戳
    # "x-xray-traceid": "cf558eb69cc7bf1afe0b632d5a0fdbe0" # 变
}
cookies = {
    "abRequestId": "8b73753f-7a64-5786-8ae5-3dee7d6840b6",
    "ets": "1780987154544",
    "xsecappid": "xhs-pc-web",
    "a1": "19eab1b50e4owom88wv9grrsf737gks3rrgk1bg2o50000291252",
    "webId": "7903d21e32d7d3d81b9710db4d0d96f2",
    "gid": "yjd0DyDK2yFJyjd0DyD28FDkd4lEl6YYEhjkkJlFFMiWqT28WkTMqy888JjyJ2J88Df2dK8q",
    "x-rednote-datactry": "CN",
    "x-rednote-holderctry": "CN",
    "web_session": "040069b97411ec1012cebf2d1f384b04496ac2",
    "id_token": "VjEAAHQMpvAt9Kj+1Ai80FU1JmEB77r0oUHPgQYVl12Gkr/qAZsGEr4TYVR61P34a1BlHje3BEkbNaybyWqJtseh6uSdFJh346rxhSnEGSpQ6z30EsI3ya4anOrOtJ3mXNCRtKZ2",
    "unread": "{%22ub%22:%226a2100ab000000003601edc3%22%2C%22ue%22:%226a23fb7900000000080312e9%22%2C%22uc%22:30}",
    "acw_tc": "0a4a830e17811683709475249e5e4f5d5881b7fb9404327ffe8693912974ec",
    "websectiga": "6169c1e84f393779a5f7de7303038f3b47a78e47be716e7bec57ccce17d45f99",
    "sec_poison_id": "3b285b22-108e-46f7-a314-ccc2a44db494",
    "webBuild": "6.18.0",
    "loadts": "1781168376792"
}
url = "https://so.xiaohongshu.com/api/sns/web/v2/search/notes"

data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers,cookies = cookies, data=data)

print(response.text)
print(response)