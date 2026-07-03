setTimeout = function(){}
setInterval = function(){}

window = globalThis
window.window = window.top = window.self = window
window.addEventListener = function(){}
window.Screen = function(){}
window.MouseEvent = function (){}
window.WebGLRenderingContext = function (){}


window.loadts = '1781165764141'
window.xsecappid = 'xhs-pc-web'
window.insight = {}
window.xhsFingerprintV3 = {}

// function XMLHttpRequest(){}
// XMLHttpRequest.prototype.open = function (){}
// XMLHttpRequest.prototype.send = function (){}
// XMLHttpRequest.prototype.setRequestHeader = function (){}
// XMLHttpRequest.prototype.getAllResponseHeaders = function (){}
// window.XMLHttpRequest = XMLHttpRequest


function Navigator(){}
Navigator.prototype.webdriver = false
Navigator.prototype.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36'
navigator = new Navigator()
window.Navigator = Navigator

function Element(){}
Element.prototype.getAttribute = function (){}
Element.prototype.removeChild = function (){}

function Document(){}
Document.prototype.all = new Element()
Document.prototype.body = new Element()
Document.prototype.cookie = 'abRequestId=8b73753f-7a64-5786-8ae5-3dee7d6840b6; ets=1780987154544; xsecappid=xhs-pc-web; a1=19eab1b50e4owom88wv9grrsf737gks3rrgk1bg2o50000291252; webId=7903d21e32d7d3d81b9710db4d0d96f2; gid=yjd0DyDK2yFJyjd0DyD28FDkd4lEl6YYEhjkkJlFFMiWqT28WkTMqy888JjyJ2J88Df2dK8q; webBuild=6.17.6; unread={%22ub%22:%226a2100ab000000003601edc3%22%2C%22ue%22:%226a23fb7900000000080312e9%22%2C%22uc%22:30}; websectiga=2a3d3ea002e7d92b5c9743590ebd24010cf3710ff3af8029153751e41a6af4a3; loadts=1781165764141'
Document.prototype.addEventListener = function (){}
Document.prototype.documentElement = new Element()
Document.prototype.getElementById = function(tag_name){
    console.log("getElementById:::", tag_name)
}
Document.prototype.getElementsByTagName = function (tag_name){
    console.log("getElementsByTagName:::", tag_name)
    if (tag_name === "*"){
        return []
    }
}
document = new Document()
document.querySelector = function(tag_name){
    console.log("querySelector:::", tag_name)
}
document.querySelectorAll = function(tag_name){
    console.log("querySelectorAll:::", tag_name)
}
document.evaluate = function(tag_name){
    console.log("evaluate:::", tag_name)
}

location = {
    "ancestorOrigins": {},
    "href": "https://www.xiaohongshu.com/search_result_ai?keyword=%25E5%2581%25A5%25E8%25BA%25AB&source=web_explore_feed&type=51",
    "origin": "https://www.xiaohongshu.com",
    "protocol": "https:",
    "host": "www.xiaohongshu.com",
    "hostname": "www.xiaohongshu.com",
    "port": "",
    "pathname": "/search_result_ai",
    "search": "?keyword=%25E5%2581%25A5%25E8%25BA%25AB&source=web_explore_feed&type=51",
    "hash": ""
}

function Storage(){}
Storage.prototype.getItem = function(tag_name){
    console.log("getItem:::", tag_name)
    if(tag_name === 'unloads_record'){
        return '[[1781163449291.5,53249],[1781163502541.1,8803],[1781163511344.4,31045],[1781163542389.1,194550],[1781163736939.3,407272]]'
    }
    if(tag_name === 'kbconf'){
        return null
    }
}
localStorage = new Storage()



function setProxyArr(proxyObjArr) {
  // 获取全局对象（浏览器中是window，Node.js中是global）
  const globalObj = typeof window !== 'undefined' ? window : global;

  for (let i = 0; i < proxyObjArr.length; i++) {
    const path = proxyObjArr[i];

    // 解析路径
    const parts = path.split('.');

    // 对于简单属性，保持原有逻辑
    if (parts.length === 1) {
      const objName = path;
      let targetObj;

      try {
        targetObj = globalObj[objName];
        if (targetObj === undefined || targetObj === null) {
          throw new Error(`${objName} is not defined`);
        }
      } catch (e) {
        targetObj = {};
        globalObj[objName] = targetObj;
        console.warn(`对象 ${objName} 不存在，已创建空对象`);
      }

      const handler = {
        get: function(target, property, receiver) {
          if (property !== "Math" && property !== "isNaN" && property !== "encodeURI") {
            const value = Reflect.get(target, property, receiver);
            if (value && typeof value !== "string" &&
                typeof value !== "number" &&
                typeof value !== "boolean" &&
                Object.keys(value).length > 3) {
                  // 不记录日志
                } else {
              console.log(
                `方法: get, 对象: ${objName}, 属性: ${property.toString()}, 属性类型: ${typeof property}, 属性值: ${value}, 属性值类型: ${typeof value}`
              );
            }
            return value;
          }
          return Reflect.get(target, property, receiver);
        },
        set: function(target, property, value, receiver) {
          console.log(
            `方法: set, 对象: ${objName}, 属性: ${property.toString()}, 属性类型: ${typeof property}, 属性值: ${value}, 属性值类型: ${typeof value}`
          );
          return Reflect.set(target, property, value, receiver);
        }
      };

      globalObj[objName] = new Proxy(targetObj, handler);
      console.log(`已为 ${objName} 对象创建代理`);
    }
    // 对于嵌套路径的处理
    else {
      // 确保父路径存在
      let parent = globalObj;
      let allExist = true;

      // 检查路径上的所有对象是否存在
      for (let j = 0; j < parts.length - 1; j++) {
        if (!parent[parts[j]] || typeof parent[parts[j]] !== 'object') {
          allExist = false;
          break;
        }
        parent = parent[parts[j]];
      }

      const lastKey = parts[parts.length - 1];
      let targetObj;

      if (allExist && parent[lastKey] !== undefined && parent[lastKey] !== null) {
        targetObj = parent[lastKey];
        // 检查 targetObj 是否为对象类型
        if (typeof targetObj !== 'object') {
          console.warn(`${path} 不是对象类型（${typeof targetObj}），跳过代理`);
          continue;
        }
      } else {
        // 创建空对象
        targetObj = {};
        // 确保父路径存在
        let current = globalObj;
        for (let j = 0; j < parts.length - 1; j++) {
          if (!current[parts[j]] || typeof current[parts[j]] !== 'object') {
            current[parts[j]] = {};
          }
          current = current[parts[j]];
        }
        current[lastKey] = targetObj;
        console.warn(`对象 ${path} 不存在，已创建空对象`);
      }

      // 再次确认 targetObj 是对象
      if (typeof targetObj !== 'object') {
        console.warn(`${path} 无法代理，target 不是对象类型`);
        continue;
      }

      const handler = {
        get: function(target, property, receiver) {
          if (property !== "Math" && property !== "isNaN" && property !== "encodeURI") {
            const value = Reflect.get(target, property, receiver);
            if (value && typeof value !== "string" &&
                typeof value !== "number" &&
                typeof value !== "boolean" &&
                Object.keys(value).length > 3) {
                  // 不记录日志
                } else {
              console.log(
                `方法: get, 对象: ${path}, 属性: ${property.toString()}, 属性类型: ${typeof property}, 属性值: ${value}, 属性值类型: ${typeof value}`
              );
            }
            return value;
          }
          return Reflect.get(target, property, receiver);
        },
        set: function(target, property, value, receiver) {
          console.log(
            `方法: set, 对象: ${path}, 属性: ${property.toString()}, 属性类型: ${typeof property}, 属性值: ${value}, 属性值类型: ${typeof value}`
          );
          return Reflect.set(target, property, value, receiver);
        }
      };

      // 重新获取父对象并设置代理
      let finalParent = globalObj;
      for (let j = 0; j < parts.length - 1; j++) {
        finalParent = finalParent[parts[j]];
      }
      finalParent[lastKey] = new Proxy(targetObj, handler);
      console.log(`已为 ${path} 对象创建代理`);
    }
  }
}

// setProxyArr(["window","document","location","navigator","localStorage","screen","history","sessionStorage", "document.documentElement","document.addEventListener,"]);



