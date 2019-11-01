import axios from 'axios'
//设置基础地址
axios.defaults.baseURL = "http://106.12.79.128:1901"
//axios拦截器 拦截请求
axios.interceptors.request.use(function (config) { //只要是使用axios发送的请求 通通都会被拦截器拦截
    const token = localStorage.getItem("lgtoken")
    //获取请求的接口 如果是登入或者是注册那就没有必要写到token
    const api = config.url
    if (api === "/users/login" || api === "users/register") {
        //console.log(config)
        return config
    } else {
        // config就是当前的请求对象
        config.headers['authorization'] = token
        return config
    }
})
//拦截响应
axios.interceptors.response.use(function (config) {
    //console.log(config)
    if (!config.data.state && config.data.msg == "校验失败") {
        alert('用户信息过期请重新登入')
        location.href = '#/login'
        localStorage.removeItem('lgtoken')
        return config
    } else if (!config.data.state && config.data.msg == "注册出错") {
        alert('用户信息填写错误')
        location.href = '#/regist'
        return config
    }
    else {
        return config
    }
})
//登入
export const login = (data) => axios({
    url: '/users/login',
    method: 'post',
    data,
    timeout: 5000
})
//获取学员信息
export const getStuList = (params = {}) => axios({
    method: 'GET',
    url: '/students/getstulist',
    params
})
//注册
export const regist = (data) => axios({
    url: '/users/register',
    method: 'post',
    data,
    timeout: 5000
})
//添加学员项目信息
export const addStuInfo = (data) => axios({
    url: 'students/addstu',
    method: 'post',
    data,
    timeout: 5000
})
//删除学员信息
export const delStu = (sId) => {
    return axios.get(`students/delstu?sId=${sId}`)
}
//更新学员项目信息
export const editStuInfo = (updated) => axios({
    url: "students/updatestu",
    data: updated,
    method: 'post'
})
//搜索学员信息
export const searchStu = (data) => {
    return axios.get(`students/searchstu`, {
        params: data
    })
}
//获取班级列表
export const getClasses = () => {
    return axios.get("students/getclasses")
}

