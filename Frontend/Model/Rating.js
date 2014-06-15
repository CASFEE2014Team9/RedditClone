function Rating(creator,post,value) {
    guardCustomType(creator, "creator", User );
    guardCustomType(post, "post", Post );

    this.value = value;
    this.post = post;
    this.creator = creator;

    this.post.ratings.push(this);
    this.post.display();
};

Rating.prototype.delete = function() {
    this.post.ratings.removeItem(this);
};
