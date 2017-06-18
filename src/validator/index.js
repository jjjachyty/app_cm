// 正整数验证


export default {
    positiveInteger(value) {
        var r = /^\+?[1-9][0-9]*$/;
        return r.test(value)
    },
    positive(value) {
        console.log("positive", value)
        var r = /^[0-9].*$/;
        return r.test(value)
    }

}