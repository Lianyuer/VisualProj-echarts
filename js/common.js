// axios基地址
// baseURL 将自动加在url的前面  除非url是一个绝对的url

/* 
 axios({
  url:"/login"
 })

 axios({
  url:'/register'
 })
*/

axios.defaults.baseURL = 'http://ajax-api.itheima.net'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  console.log(config);
  // 在发送请求之前做些什么
  const token = localStorage.getItem('user-token')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  console.log(error);
  if (error.response.status !== 200) {
    // 删除本地存储的数据
    localStorage.removeItem('username')
    localStorage.removeItem('user-token')

    tip('请重新登录')
    setTimeout(function () {
      location.href = 'login.html'
    }, 1000)
  }
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 封装toast提示函数
function tip(msg) {
  const toastDom = document.querySelector('#myToast')
  const toast = new bootstrap.Toast(toastDom)
  // 修改内容并显示
  document.querySelector('.toast-body').innerHTML = msg
  toast.show()
}

// tip(123)


// 抽取校验函数 (判断是否登录)
// 访问首页  已登录 ---进入首页    未登录---提示用户--跳转到登录页面
function checkLogin() {
  const token = localStorage.getItem('user-token')
  if (token === null) {
    tip('请先登录')
    setTimeout(function () {
      location.href = 'login.html'
    }, 500)
  }
}

// 渲染用户名
function renderUserName() {
  // 读取并渲染用户名
  const username = localStorage.getItem('username')
  document.querySelector('#user').innerHTML = username
}

// 退出登录
/* 
 退出登录函数----绑定点击事件 ---删除用户名和token
*/
// 封装退出登录函数
function registerLogout() {
  const logoutBtn = document.querySelector('#logout')
  //  清除用户名和token
  logoutBtn.addEventListener('click', function () {
    localStorage.removeItem('user-token')
    localStorage.removeItem('username')
    // 跳转到登录页面
    location.href = 'login.html'
  })
}

// 首页-数据统计
// 调用接口---渲染数据
async function getData() {
  // 读取本地缓存中的token
  const token = localStorage.getItem('user-token')
  // 调用接口
  const res = await axios({
    url: '/dashboard',
  })
  console.log(res);

  const { groupData, overview, provinceData, salaryData, year } = res.data
  console.log(overview);

  // 渲染数据
  Object.keys(overview).forEach(key => {
    console.log(key);
    document.querySelector(`.${key}`).innerText = overview[key]
  })
  console.log(year);
  renderYearSalary(year)
  renderSalary(salaryData)
  renderGroupSalary(groupData)
  renderGenderSalary(salaryData)
  renderProvince(provinceData)
}
