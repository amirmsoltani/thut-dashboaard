const metaPattern = {key: "", value: "", file: {type: "", file: "", image: "", url: "", description: ""}};
const termPattern = {type: "", description: "", name: "", slug: "", parent: "", child: [], meta: {}};
export default class Secondary {
    meta = {};
    term = {};

    getTermList(type) {
        if (Array.isArray(this.term[type]))
            return this.term[type];
        if (this.term[type])
            return [this.term[type]];
        return []
    }

    Meta(key) {
        return this.meta[key] ? this.meta[key] : metaPattern;
    }

    Term(type) {
        return this.term[type] ? this.term[type] : termPattern;
    }

    getMetaList(key) {
        if (Array.isArray(this.meta[key]))
            return this.meta[key];
        if (this.meta[key])
            return [this.meta[key]];
        return []
    }

    static convertListToObject(list, name = "type") {
        let dict = {};
        if (Array.isArray(list))
            list.forEach(data => {
                let item = {...data};
                const key = item[name];
                if (item.child)
                    item.child.forEach(i => i.meta = this.convertListToObject(i.meta, "key"));
                if (item.meta)
                    item = {...item, meta: this.convertListToObject(item.meta, "key")};
                if (!dict[key])
                    dict[key] = item;
                else if (Array.isArray(dict[key]))
                    dict[key].push(item);
                else
                    dict[key] = [dict[key], item];

            });
        return dict;
    }

    static metaObj(value) {

        if (Array.isArray(value)) {
            const list = [];
            value.forEach(i => {
                const obj = Secondary.metaObj(i);
                if (Array.isArray(obj))
                    list.push(...obj);
                else
                    list.push(obj);
            });
            return list;
        }
        const meta = {};
        if (value.id)
            meta.id = value.id;
        meta.key = value.key;
        meta.value = value.value;
        if(value.file)
            meta.file = value.file.id;
        return meta;
    }

    static termObj(value) {
        if (Array.isArray(value)) {
            const list = [];
            value.forEach(i => {
                const obj = Secondary.termObj(i);
                if (Array.isArray(obj))
                    list.push(...obj);
                else
                    list.push(obj);

            });
            return list;
        }
        return value.id;
    }


    getJson(type, status) {
        const form = {};
        if (this.id)
            form.id = this.id;

        form.title = this.title;
        form.context = this.context;
        form.type = type;
        form.status = status;
        if (this.release)
            form.release = this.release;
        if (this.parent)
            form.parent = this.parent;
        form.meta = Secondary.metaObj(Object.values(this.meta));
        form.term = Secondary.termObj(Object.values(this.term));

        return form;
    }


}

