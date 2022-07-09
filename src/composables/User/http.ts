import QS from "qs";
import { base_url } from "../base";
import router from "../../router/router";

interface Option {
	method: "GET" | "POST";
	handle: boolean;
	body: any;
}

const TIME_OUT = 5000; // 超时时间

/**
 * @name 基础fetch
 * @param {string} url 请求path
 * @param {Object} options feich请求配置
 * @returns
 */
function baseFetch(url: string, options: Option) {
	// 基础配置
	const baseOptions = {
		method: "GET", // 默认GET请求
		headers: {
			// 默认请求头
			"Content-type": "application/x-www-form-urlencoded",
		},
		/**
		 * include:
		 * 默认不论是不是跨域的请求
		 * 总是发送请求资源域在本地的 cookies、HTTP Basic authentication 等验证信息
		 * omit: 从不发送cookies
		 * same-origin: 同源发送cookies
		 */
		credentials: "include",
		/**
		 * cors:
		 * 发送的是非简单的跨域请求，会先发送option预检请求
		 */
		mode: "cors",

		/**
		 * no-cache:
		 * 总是发送正常请求，且不缓存任何请求
		 */
		cache: "no-cache",
	};

	// 合并 options
	options = Object.assign(baseOptions, options);

	const { method, handle, body } = options;

	// get请求没有请求体，需要将参数拼接到url上
	if (method === "GET" && body.constructor === Object) {
		const paramsArray: string[] = [];
		Object.keys(body).forEach((key) =>
			paramsArray.push(key + "=" + encodeURIComponent(body[key]))
		);
		if (url.search(/\?/) === -1) {
			url += "?" + paramsArray.join("&");
		} else {
			url += "&" + paramsArray.join("&");
		}

		// 删除请求体属性
		delete options.body;
	}
	// post请求有请求体，但是需要经过编码操作
	else if (method === "POST" && body.constructor === Object) {
		options.body = QS.stringify(body);
	} else {
	}

	// 利用 Promise.race 实现超时拦截
	return Promise.race([
		new Promise((resolve, reject) => {
			// 时间到了超时，直接reject
			setTimeout(() => {
				reject(new Error("request timeout"));
			}, TIME_OUT);
		}),
		new Promise((resolve, reject) => {
			fetch(base_url + url, options)
				.then(async (res: Response) => {
					// response interceptors 状态码拦截，对应异常状态吗do something
					if (!/^(2|3)\d{2}$/.test(String(res.status) /* 数字转字符串 */)) {
						switch (res.status) {
							case 401: //当前用户需要验证（一般是未登陆）
								window.$notification["warning"]({
									duration: 2000,
									content: "警告",
									meta: "未登录，请先登录！",
								});
								router.push({ name: "login" });
								break; //一般可以弹出遮盖层，或者回到登陆页面
							case 403: // 服务器理解请求，但是拒绝执行，一般是token，session过期
								console.log("登录错误");
								break;
							case 404: // 找不到页面(请求失败，资源在服务器上未找到)，可以给一个友好的提示
								break;
						}
						return Promise.reject(res);
					}
					// 返回数据
					if (handle) {
						const data = res.json();
						resolve(data);
					} else {
						resolve(res.text());
					}
				})
				.catch((err) => {
					reject(err);
				});
		}),
	]);
}

export { baseFetch };
export type { Option };
