const jsonp = ({ url, params, callback }) => {
  // 生成链接
  const generateUrl = () => {
    let dataSrc = '';
    // 拼接参数
    for (const key in params) {
      if (Object.hasOwnProperty.call(params, key)) {
        dataSrc += `${key}=${params[key]}&`;
      }
    }

    dataSrc += `callback=${callback}`;
    return `${url}?${dataSrc}`;
  };

  return new Promise((resolve, reject) => {
    // 创建 script 标签
    const scriptEl = document.createElement('script');
    scriptEl.src = generateUrl();
    
    // 在全局对象上挂载回调函数
    window[callback] = (data) => {
      // 移除 script 标签
      scriptEl.parentNode.removeChild(scriptEl);
      delete window[callback];
      resolve(data);
    };
    
    scriptEl.onerror = (err) => {
      delete window[callback];
      // 移除 script 标签
      scriptEl.parentNode.removeChild(scriptEl);
      reject(err);
    };

    // 插入到页面，立即发起请求
    document.body.appendChild(scriptEl);
  });
};

// 测试
jsonp({
  url: 'https://s.weibo.com/ajax/jsonp/suggestion',
  params: { key: 'Oops', _cb: 'jsonpCallback' },
  callback: 'jsonpCallback',
}).then((data) => {
  console.log(data);
  // script 返回数据为： try{window.jsonpCallback&&jsonpCallback({"code":100000,"msg":"","data":[]});}catch(e){}
  // 接收到数据：{code: 100000, msg: "", data: Array(0)}
});
