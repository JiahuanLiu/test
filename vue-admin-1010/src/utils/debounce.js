/* eslint-disable indent */
/* eslint-disable no-undef */

export default function debounce (fn, ms = 1000) {
    let timer = null

    return function exec (...args) {
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
        }, ms)
    }
}
