/* eslint-disable indent */
export default function throttle (fun, wait) {
    let flag = false

    return function (arg, t) {
        if (flag) return
        flag = true

        setTimeout(function () {
            fun(arg, t)
            flag = false
        }, wait)
    }
}
