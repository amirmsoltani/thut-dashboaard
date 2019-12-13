import moment from "jalali-moment";
export function Persian($props) {
    const dict = {
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',
        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹',
        '0': '۰',
        '.': '.'
    };


    let num = "";
    const number = $props.children.toString();
    for (let i = 0; i < number.length; i++)
        if (dict[number[i]] !== undefined)
            num += dict[number[i]];
        else
            num += number[i];
    return num;

}

/**
 * @return {string}
 */
export function ToJalali({children}) {
    const date = new Date(children);
    const m = moment(date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate(), "YYYY/MM/DD")
        .locale("fa");
    const str =
        m.format(`jYYYY ${
            week[date.getDay()]
            } jDD ${
            month[parseInt(m.format("jMM"))]}`);
    return  Persian({children:str})

}

/**
 * @return {string}
 */
export function TimePersian({children}) {
    const d = new Date(children);
    return Persian({children:d.getHours() + ":" + d.getMinutes()})

}

export const week = ["یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"];
export const month = ["اسفند","فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن"];