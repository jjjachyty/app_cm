import Vue from 'vue'
import api from '../api/index'
import moment from 'moment';


let pricingStatus = { "-1": "异常计算", "0": "未完成计算", "1": "完成计算", "2": "审批中", "3": "通过审批", "4": "驳回审批", "5": "已放款" }
let termMult = { "Y": "年", "M": "月", "D": "天" }
let rateType = { "1": "固定利率", "2": "浮动利率" }
let repriceFreq = { "0": "无", "30": "一个月", "90": "三个月", "180": "六个月", "360": "一年" }
let rpymType = { "1": "一次还款", "2": "等额本息", "3": "等额本金", "4": "不定期不定额" }
let rpymCapitalFreq = { "-1": "无", "0": "一次还本", "30": "按月还本", "90": "按季还本", "360": "按年还本" }
let guaranteType = { "1": "企业", "2": "担保公司", "3": "信用" }
let currency = { "CNY": "人民币", "USD": "美元", "HKD": "港币" }
let sceneDPTerm = { 0: "活期", 1: "一天", 7: "七天", 30: "一个月", 90: "三个月", 180: "六个月", 360: "一年", 720: "二年", 1080: "三年", 1800: "五年" }
let custSize = {
    '1': '大型',
    '2': '中型',
    '3': '小型',
    '4': '微型',
    '5': '事业',
    '6': '零售',
    '7': '未知',
}
let mortgageType = {
    '1': '企业',
    '2': '担保公司',
    '3': '信用',
}


Vue.filter('avatar', function(input) {
    return input.substr(2, 2)
})




Vue.filter('dict', function(input, dictType) {
    switch (dictType) {
        case 'pricingStatus':
            return pricingStatus[input]
        case 'termMult':
            return termMult[input]
        case 'rateType':
            return rateType[input]
        case 'repriceFreq':
            return repriceFreq[input]
        case 'rpymType':
            return rpymType[input]
        case 'rpymCapitalFreq':
            return rpymCapitalFreq[input]
        case 'guaranteType':
            return guaranteType[input]
        case 'currency':
            return currency[input]
        case 'sceneDPTerm':
            return sceneDPTerm[input]
        case 'custSize':
            return custSize[input]
        case 'mortgageType':
            return mortgageType[input]
    }

})




Vue.filter('moment', function(value, formatString) {
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
    return moment(value).format(formatString);
});

Vue.filter('bankRound', function(value, precision) {
    var old = String(value);
    var len = precision || 4;
    var a1 = Math.pow(10, len) * old;
    a1 = Math.round(a1);
    var oldstr = old.toString()
    var start = oldstr.indexOf(".");
    if (start > 0 && oldstr.split(".")[1].length == len + 1) {
        if (oldstr.substr(start + len + 1, 1) == 5) {
            var flagval = oldstr.substr(start + len, 1) - 0;
            if (flagval % 2 == 0) {
                a1 = a1 - 1;
            }
        }
    }
    var b1 = (a1 / Math.pow(10, len)).toFixed(len);
    return b1;
});

String.prototype.dict = function(dictType) {
    switch (dictType) {
        case 'pricingStatus':
            return pricingStatus[this]
        case 'termMult':
            return termMult[this]
        case 'rateType':
            return rateType[this]
        case 'repriceFreq':
            return repriceFreq[this]
        case 'rpymType':
            return rpymType[this]
        case 'rpymCapitalFreq':
            return rpymCapitalFreq[this]
        case 'guaranteType':
            return guaranteType[this]
        case 'currency':
            return currency[this]
        case 'sceneDPTerm':
            return sceneDPTerm[this]
        case 'custSize':
            return custSize[this]
        case 'mortgageType':
            return mortgageType[this]
    }
}
Number.prototype.round = function(precision) {
    var old = String(this);
    var len = precision || 4;
    var a1 = Math.pow(10, len) * old;
    a1 = Math.round(a1);
    var oldstr = old.toString()
    var start = oldstr.indexOf(".");
    if (start > 0 && oldstr.split(".")[1].length == len + 1) {
        if (oldstr.substr(start + len + 1, 1) == 5) {
            var flagval = oldstr.substr(start + len, 1) - 0;
            if (flagval % 2 == 0) {
                a1 = a1 - 1;
            }
        }
    }
    var b1 = (a1 / Math.pow(10, len)).toFixed(len);
    return b1;
}