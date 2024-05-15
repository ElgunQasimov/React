class Blog {
    constructor(title, description, src, journalistId,tagIds) {
        this.title = title;
        this.description = description;
        this.src = src;
        this.journalistId = journalistId;
        this.tagIds = tagIds;
        this.likes = [];
        this.comments = [];
    }
}