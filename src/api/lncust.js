import {
    rpmApiRoot,
    pageSize
} from '../config'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
    getLnCust(params, cb, errorcb) {

        var custurl = rpmApiRoot + '/cust'
        var headers = { 'Sid': sessionStorage.getItem('sid'), 'Page-Size': pageSize, 'Start-Row-Number': 0, 'Order-Attr': 'CreateTime' }
        if (params != undefined) {

            if (params.CustCode) {
                custurl = custurl + '/CustCode/' + params.CustCode
            } else if (params.CustName) {
                custurl = custurl + '/CustName/' + params.CustName
            } else if (params.uuid) {
                custurl = custurl + '/uuid/' + params.uuid
            }
            if (params.StartRowNumber > 0) {
                headers['Start-Row-Number'] = params.StartRowNumber
            }

        }

        console.log("头信息", headers)
        axios.get(
            custurl, {
                headers: headers
            }).then((response) => {
            console.log("客户响应成功")
                //响应成功
            if ("200" == response.data.RstCode) {
                setTimeout(() => {
                    cb(response.data.PageData.Rows, params)
                }, 16)
            } else {
                errorcb(response.data)
            }


        }).catch((resp) => {
            console.log("客户响应失败")

            //错误
            //  setTimeout(() => {
            errorcb(resp.data)
                // }, 16)
        })



    },
    getLnPrics(params, cb, errorcb) {

        var custurl = rpmApiRoot + '/lnbusiness'
        var headers = { 'Sid': sessionStorage.getItem('sid'), 'Page-Size': pageSize, 'Start-Row-Number': 0, 'Order-Attr': 'CreateTime' }
            // if (params != undefined) {

        //     if (params.CustCode) {
        //         custurl = custurl + '/CustCode/' + params.CustCode
        //     }
        //     if (params.StartRowNumber > 0) {
        //         headers['Start-Row-Number'] = params.StartRowNumber
        //     }

        // }


        axios.get(
            custurl, {
                headers: headers
            }).then((response) => {
            //响应成功
            if ("200" == response.data.RstCode) {
                setTimeout(() => {
                    cb(response.data.PageData.Rows, params)
                }, 16)
            } else {
                errorcb(response.data)
            }


        }).catch((resp) => {
            //错误
            //  setTimeout(() => {
            errorcb(resp.data)
                // }, 16)
        })



    }
}