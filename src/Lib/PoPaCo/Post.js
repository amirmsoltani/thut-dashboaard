import Secondary from "./Secondary";

export default class Post extends Secondary {
    constructor(post) {
        super();
        const reform = post.reform;
        this.id = post.id;
        this.title = post.title;
        this.context = post.context;
        this.status = post.status;
        this.type = post.type;
        this.release = post.release;
        this.author = post.author;
        this.parent = post.parent;
        this.term = reform ? {...post.term} : Secondary.convertListToObject(post.term);
        this.meta = reform ? {...post.meta} : Secondary.convertListToObject(post.meta, "key");
        this.reform = true;
        this.view = post.view;
    }

    addMeta(obj, type = 'text') {
        if (type === 'text') {
            this.meta[obj.key] = obj;
            return
        }
        if (Array.isArray(this.meta[obj.key]))
            this.meta[obj.key] = [...this.meta[obj.key], obj];
        else this.meta[obj.key] = [obj,];
    }

    addTerm(obj, type = 'text') {
        if (type === 'text') {
            this.term[obj.type] = obj;
            return
        }
        if (Array.isArray(this.term[obj.type]))
            this.term[obj.type] = [...this.term[obj.type], obj];
        else this.term[obj.type] = [obj,];
    }

    removeMeta(obj) {
        if (Array.isArray(this.meta[obj.key]))
            this.meta[obj.key].find((i, index) => {
                if (obj.id === i.id && obj.value === i.value) {
                    this.meta[obj.key].splice(index, 1);
                    return true;
                }
                return false;
            });
        else
            delete this.meta[obj.key];
    }
    removeTerm(obj) {
        if (Array.isArray(this.term[obj.type]))
            this.term[obj.type].find((i, index) => {
                if (obj.id === i.id && obj.name === i.name && obj.description === i.description) {
                    this.term[obj.type].splice(index, 1);
                    return true;
                }
                return false;
            });
        else
            delete this.term[obj.type];
    }

}