import {
    ssoApiRoot,
    rpmApiRoot
} from '../config'
import axios from 'axios'
import Qs from 'qs'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//axios.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8';
//var user = {userName:'Janly',realName:'张力',organCOde:'10010',organName:'天健银行渝中分行',image:'src/images/login.png'}
//var sid = 'C4A1A6087408010D364CB78F5D8FD72C'
export default {
    getAuthData(userid, sid) {
        axios.post(
            ssoApiRoot, {
                headers: { 'sid': sid },
                userid: userid
            }).then((response) => {
            console.log("访问authdata登录响应成功", response.data)
        })
    },
    userLogin(loginUser, cb, errorcb) {

        console.log("登录用户", loginUser)
        axios.post(
            ssoApiRoot, Qs.stringify({
                username: loginUser.username,
                password: loginUser.password
            })).then((response) => {
            //响应成功
            console.log("登录响应成功", response.data)
            if (response.data.code == 200) {
                setTimeout(() => {
                    //登陆安全平台后访问RPM AUTHDATA路由
                    axios.post(
                        rpmApiRoot + '/am/authdata', Qs.stringify({ 'userid': loginUser.username }), { headers: { 'sid': response.data.sid } }
                    ).then((response) => {
                        console.log("访问authdata登录响应成功", response.data)
                    })
                    cb(response.data)
                }, 16)
            } else {
                errorcb(response.data)
            }


        }).catch((response) => {
            console.log("登录响应失败", response.data)
                //错误
                  setTimeout(() => {
            errorcb(response.data)
                 }, 16)
        })
    }, loginOut(loginUser, cb, errorcb) {

        console.log("登录用户", loginUser)
        axios.post(
            rpmApiRoot+"/login/out", {loginUser},{ headers: { 'sid': sessionStorage.getItem('sid') } }).then((response) => {
            //响应成功
            console.log("退出响应成功", response.data)
            if (response.data.RstCode == 200) {
                setTimeout(() => {
                    cb(response.data)
                }, 16)
            } else {
                errorcb(response.data)
            }


        })
    }

}