import {
    rpmApiRoot,
    pageSize,
    approveApiRoot
} from '../config'
import axios from 'axios'
import Qs from 'qs'
import jsonp from 'jsonp'

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
    get(url, headers, cb, errorcb) {
        headers.sid = sessionStorage.getItem('sid')
        axios.get(
            rpmApiRoot + url, {
                headers: headers
            }).then((response) => {
            if ("200" == response.data.RstCode) {
                setTimeout(() => {
                    cb(response.data.PageData.Rows)
                }, 16)
            } else if ("403" == response.data.RstCode) {
                console.log("get 403")

                sessionStorage.setItem("sid", "")
                router.push({ name: 'login' })
            } else {
                console.log("get 错误 ", response.data.RstCode)

                errorcb(response.data)
            }
        }).catch((resp) => {
            //setTimeout(() => {
            errorcb(resp.data)
                // }, 16)
        })
    },
    getJsonp(url, opts, cb, errorcb) {
        //headers.sid = sessionStorage.getItem('sid')
        jsonp(approveApiRoot + url, opts, function(err, data) {
            if (err) {
                console.error("getJsonp -- err ---", err.message);
                errorcb(err)
            } else {
                console.log("getJsonp -- success ---", data);
                cb(data)
            }
        });
    },
    getPage(url, params, cb, errorcb) {

        var headers = { 'Sid': sessionStorage.getItem('sid'), 'Page-Size': pageSize, 'Start-Row-Number': 0, 'Order-Attr': 'UpdateTime', 'Order-Type': 'DESC' }
        if (params.StartRowNumber > 0) {
            headers['Start-Row-Number'] = params.StartRowNumber
        }
        axios.get(
            rpmApiRoot + url, {
                headers: headers
            }).then((response) => {
            //响应成功
            if ("200" == response.data.RstCode) {

                setTimeout(() => {
                    console.log("定价单", response.data.PageData.Rows, params)
                    cb(response.data.PageData.Rows, params)
                }, 16)
            } else if ("403" == response.data.RstCode) {
                console.log("getPage 403")
                sessionStorage.setItem("sid", "")
                router.push({ name: 'login' })
            } else {
                console.log("getPage 错误 ", response.data.RstCode)

                errorcb(response.data)
            }
        }).catch((resp) => {
            sessionStorage.setItem("sid", "")
            router.push({ name: 'login' })
            errorcb(resp.data)
        })



    },
    delete(url, { params }, cb, errorcb) {
        var headers = {}
        headers.sid = sessionStorage.getItem('sid')
        axios.delete(
            rpmApiRoot + url, {
                headers: headers,
                data: params
            }).then((response) => {
            if ("200" == response.data.RstCode) {
                console.log("delete - 200 - cb")

                //setTimeout(() => {
                cb(response.data, params)
                    // }, 16)
            } else {
                console.log("delete - not200 - errorcb")
                errorcb(response.data)
            }
        }).catch((resp) => {
            console.log("delete - catch - errorcb")
            errorcb(resp.data)
        })
    },
    save(url, { params }, cb, errorcb) {
        var header = {}
        header.sid = sessionStorage.getItem('sid')
        axios.post(
            rpmApiRoot + url, params, {
                headers: header
            }).then((response) => {
            console.log("save", response.data.RstCode)
            if (200 == response.data.RstCode) {
                console.log("200 cb")
                    //setTimeout(() => {
                cb(response.data.PageData.Rows)
                    //}, 16)
            } else {
                console.log("400 errorcb")
                errorcb(response.data)
            }
        }).catch((resp) => {
            console.log("catch cb")
                //setTimeout(() => {
            errorcb(resp.data)
                // }, 16)
        })
    },
    update(url, { params }, cb, errorcb) {
        console.log("update -- params--", params)
        var header = {}
        header.sid = sessionStorage.getItem('sid')
        axios.put(
            rpmApiRoot + url, params, {
                headers: header
            }).then((response) => {
            console.log("update", response.data.RstCode)
            if (200 == response.data.RstCode) {
                console.log("200 cb")
                setTimeout(() => {
                    cb(response.data.PageData.Rows)
                }, 16)
            } else {
                console.log("400 errorcb")
                errorcb(response.data)
            }
        }).catch((resp) => {
            console.log("catch cb")
                //setTimeout(() => {
            errorcb(resp.data)
                // }, 16)
        })
    },
    post(url, { params }, cb, errorcb) {
        var header = {}
        header.sid = sessionStorage.getItem('sid')
        axios.post(
            rpmApiRoot + url, Qs.stringify(params), {
                headers: header
            }).then((response) => {
            console.log("post", response.data.RstCode)
            if (200 == response.data.RstCode) {
                console.log("200 cb")
                setTimeout(() => {
                    cb(response.data.PageData.Rows)
                }, 16)
            } else {
                console.log("400 errorcb")
                errorcb(response.data)
            }
        }).catch((resp) => {
            console.log("catch cb")
                //setTimeout(() => {
            errorcb(resp.data)
                // }, 16)
        })
    },
    put(url, { params }, cb, errorcb) {
        var header = {}
        header.sid = sessionStorage.getItem('sid')
        axios.put(
            rpmApiRoot + url, Qs.stringify(params), {
                headers: header
            }).then((response) => {
            console.log("save", response.data.RstCode)
            if (200 == response.data.RstCode) {
                console.log("200 cb")
                setTimeout(() => {
                    cb(response.data.PageData.Rows)
                }, 16)
            } else {
                console.log("400 errorcb")
                errorcb(response.data)
            }
        }).catch((resp) => {
            console.log("catch cb")
                //setTimeout(() => {
            errorcb(resp.data)
                // }, 16)
        })
    }

}