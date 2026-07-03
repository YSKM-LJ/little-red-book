# 小红书搜索 API x-s 签名逆向

本项目用于逆向小红书 Web 端搜索接口 (`/api/sns/web/v2/search/notes`) 的 `x-s` 签名参数，实现在 Python 中调用该 API。

## 目录结构

```
├── main.py          # Python 入口，生成签名并发送搜索请求
├── x-s.js           # x-s 签名生成逻辑（Node.js 执行）
├── js_code.js       # 小红书核心签名算法 mnsv2（混淆后的 JS）
├── env_2.js         # 浏览器环境模拟（window/document/navigator 等）
└── 123456.html      # 浏览器调试用 HTML 页面
```

## 原理概述

小红书搜索 API 需要对请求添加 `x-s` 请求头参数进行签名校验，经过分析发现只有 `x-s` 参数是必验的（`x-b3-traceid`、`x-s-common`、`x-t`、`x-xray-traceid` 等参数均可省略）。

### 签名流程

1. **构造输入数据**：将 API 路径和请求体 JSON 拼接
   ```js
   u = "/api/sns/web/v2/search/notes" + JSON.stringify(data)
   ```

2. **计算 MD5**：
   - `m = MD5(u)` — API 路径 + 请求体的 MD5
   - `w = MD5("/api/sns/web/v2/search/notes")` — 仅 API 路径的 MD5

3. **调用核心算法**：`window.mnsv2(u, m, w)` 生成加密结果 `C`

4. **组装 x-s**：
   ```js
   {
     x0: "4.3.5",          // 版本号
     x1: "xhs-pc-web",     // 平台标识
     x2: "Windows",        // 操作系统
     x3: C,                // mnsv2 加密结果
     x4: "object"
   }
   ```
   将上述对象 JSON 序列化 → UTF-8 编码 → 自定义 Base64 编码 → 前缀 `XYS_`

## 依赖安装

```bash
pip install requests PyExecJS
npm install crypto-js
```

## 使用方法

```python
python main.py
```

`main.py` 会：
1. 通过 `execjs` 调用 `x-s.js` 中的 `get_xs()` 函数
2. 使用生成的 `x-s` 签名发送 POST 请求到搜索接口
3. 打印返回结果

## 文件说明

### `x-s.js`
签名生成的顶层逻辑，依赖 `env_2.js` 和 `js_code.js`：
- `get_xs(data)` — 主入口，接收请求体对象，返回完整的 `x-s` 字符串
- `b64Encode()` — 自定义 Base64 编码（使用非标准字符表）
- `encodeUtf8()` — UTF-8 编码

### `js_code.js`
从小红书 Web 页面提取并经过混淆的核心算法文件，定义了 `window.mnsv2` 函数。该文件通过 `123456.html` 可在浏览器中加载调试。

### `env_2.js`
在 Node.js 环境中模拟浏览器对象（`window`、`document`、`navigator`、`localStorage`、`location` 等），使混淆后的浏览器端 JS 能在 Node.js 中通过 `execjs` 正常执行。

### `main.py`
Python 调用入口，关键参数说明：
- `keyword`：搜索关键词
- `page`：页码
- `page_size`：每页数量
- `search_id`：搜索会话 ID（会变化）
- `sort`：排序方式（`general` 综合、`time_descending` 最新、`popularity_descending` 最热）

## 注意事项

- `search_id` 参数每次搜索会话会变化，需从搜索页面的 HTML 或接口响应中获取
- Cookie 中的 `a1`、`webId`、`web_session` 等需要有效的登录态或设备标识
- 小红书接口有反爬机制，请合理控制请求频率
- 本项目仅供学习研究，请勿用于商业用途
