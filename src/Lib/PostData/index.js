export const types = {5: 'music', 6: 'video', 7: 'album', 8: 'news'};
export const status = {1: 'منتشرشده', 2: 'پیش نویس', 3: 'تعلیق'};

export function local_datetime(old_date) {
    const date = new Date(old_date);

    function plus(item) {
        return item.toString().length === 1 ? "0" + item : item;
    }
    console.log(old_date);
    return `${date.getFullYear()}-${plus(date.getMonth() + 1)}-${plus(date.getDate())}T${plus(date.getHours())}:${plus(date.getMinutes())}`
}