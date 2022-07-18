import axios from "axios";

import { appConfigs } from "classes/AppConfigs";

const {
  configs: {
    customAxios: { defaultHeaders, timeout, validateStatus },
    others: { SERVER_BASE_URL },
  },
} = appConfigs;
const customAxios = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: defaultHeaders,
  timeout,
  validateStatus,
});

export { customAxios };

//* Return is interceptor, so if you want to remove interceptor you need that.
// axios.interceptors.response.use(
// 	function (response) {
//* Any status code that lie within the range of 2xx cause this function to trigger
//* Do something with response data
// 		return response;
// 	},
// 	function (error) {
//* Any status codes that falls outside the range of 2xx cause this function to trigger
//* Do something with response error
// 		return Promise.reject(error);
// 	},
// );

// axios.interceptors.request.use(
// 	function (config) {
// 		config.headers.test = "I am only a header!";
// 		return config;
// 	},
// 	null,
// 	{ synchronous: true },
// );

// function onGetCall(config) {
// 	return config.method === "get";
// }
// axios.interceptors.request.use(
// 	function (config) {
// 		config.headers.test = "special get headers";
// 		return config;
// 	},
// 	null,
// 	{ runWhen: onGetCall },
// );

// axios.get("/user/12345").catch(function (error) {
// 	if (error.response) {
//* The request was made and the server responded with a status code
//* that falls out of the range of 2xx
// 		console.log(error.response.data);
// 		console.log(error.response.status);
// 		console.log(error.response.headers);
// 	} else if (error.request) {
//* The request was made but no response was received
//* `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//* http.ClientRequest in node.js
// 		console.log(error.request);
// 	} else {
//* Something happened in setting up the request that triggered an Error
// 		console.log("Error", error.message);
// 	}
// 	console.log(error.config);
// });

// axios.get("/user/12345").catch(function (error) {
// 	console.log(error.toJSON());
// });

// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();

// axios.get('/user/12345', {
//   cancelToken: source.token
// }).catch(function (thrown) {
//   if (axios.isCancel(thrown)) {
//     console.log('Request canceled', thrown.message);
//   } else {
//* handle error
//   }
// });

// axios.post('/user/12345', {
//   name: 'new name'
// }, {
//   cancelToken: source.token
// })

// // cancel the request (the message parameter is optional)
// source.cancel('Operation canceled by the user.');
// You can also create a cancel token by passing an executor function to the CancelToken constructor:

// const CancelToken = axios.CancelToken;
// let cancel;

// axios.get('/user/12345', {
// cancelToken: new CancelToken(function executor(c) {
// An executor function receives a cancel function as a parameter
// cancel = c;
// })
// });

// cancel the request
// cancel();

// const controller = new AbortController();

// axios
// 	.get("/foo/bar", {
// 		signal: controller.signal,
// 	})
// 	.then(function (response) {
//*...
// 	});
// // cancel the request
// controller.abort();

// const params = new URLSearchParams();
// params.append('param1', 'value1');
// params.append('param2', 'value2');
// axios.post('/foo', params);

// Alternatively, you can encode data using the qs library:

// axios.post('/foo', qs.stringify({ 'bar': 123 }));
// Or in another way (ES6),

// const data = { 'bar': 123 };
// const options = {
//   method: 'POST',
//   headers: { 'content-type': 'application/x-www-form-urlencoded' },
//   data: qs.stringify(data),
//   url,
// };
// axios(options);

// Node.js
// Query string
// axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
// or 'URLSearchParams' from 'url module' as follows:

// const url = require('url');
// const params = new url.URLSearchParams({ foo: 'bar' });
// axios.post('http://something.com/', params.toString());

// const FormData = require('form-data');

// const form = new FormData();
// form.append('my_field', 'my value');
// form.append('my_buffer', new Buffer(10));
// form.append('my_file', fs.createReadStream('/foo/bar.jpg'));

// axios.post('https://example.com', form, { headers: form.getHeaders() })
// Alternatively, use an interceptor:

// axios.interceptors.request.use(config => {
//   if (config.data instanceof FormData) {
//     Object.assign(config.headers, config.data.getHeaders());
//   }
//   return config;
// });
