function Rating(creator,post,value) {
    if ( !(creator instanceof User) )
    {
        throw new TypeError("Parameter creator must be of type User");
    }

    if ( !(post instanceof Post) )
    {
        throw new TypeError("Parameter post must be of type Post");
    }

    this.value = value;
    this.post = post;
    this.creator = creator;

    this.post.ratings.push(this);
    this.post.display();
};

Rating.prototype.delete = function() {
    this.post.ratings.removeItem(this);
};
