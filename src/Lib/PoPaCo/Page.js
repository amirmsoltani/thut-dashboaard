import Secondary from "./Secondary";
import Post from "./Post";

export default class Page extends Secondary {
    posts = {};
    term = {};
    meta = {};
    sections = {};
    constructor(page) {
        super();
        this.title = page.title;
        this.context = page.context;
        if (page.reform) {
            this.term = page.term;
            this.meta = page.meta;
            this.sections = page.sections;
            Object.keys(page.posts).forEach(item => {
                this.posts[item] = new Post(page.posts[item]);
            });
        }
        else {
            this.term = Secondary.convertListToObject(page.term);
            this.meta = Secondary.convertListToObject(page.meta, "key");
            page.term.forEach((item,index) => {
                    item.type === "section" && (this.sections[item.name] = {posts: [],index})
                }
            );
            page.child.forEach(item => {
                this.posts[item.id] = new Post(item);
                this.posts[item.id].getTermList("section").forEach(obj=>{
                    this.sections[obj.name] && this.sections[obj.name].posts.push(item.id);
                })
            });
        }
        this.reform = true;


    }
    getSectionPosts(section) {
        if(this.sections[section].posts.length)
            return this.sections[section].posts.map(i => this.posts[i]);
        const index = this.sections[section].index;
        return this.term["section"][index].child;
    }

}