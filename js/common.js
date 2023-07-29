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

// 封装toast提示函数
function tip(msg) {


  // 修改内容并显示


}

// tip(123)


// 抽取校验函数 (判断是否登录)
// 访问首页  已登录 ---进入首页    未登录---提示用户--跳转到登录页面
function checkLogin() {





}

// 渲染用户名
function renderUserName() {
  // 读取并渲染用户名



}

// 退出登录
/* 
 退出登录函数----绑定点击事件 ---删除用户名和token
*/
// 封装退出登录函数
function registerLogout() {

  //  清除用户名和token


  // 跳转到登录页面


}

