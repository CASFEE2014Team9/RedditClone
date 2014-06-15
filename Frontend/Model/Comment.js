function Comment(creator,post,commentText) {

    if ( !(creator instanceof User) )
    {
        throw new TypeError("Parameter creator must be of type User");
    }

    if ( !(post instanceof Post) )
    {
        throw new TypeError("Parameter post must be of type Post");
    }

    this.text = commentText;
    this.post = post;
    this.creator = creator;
    this.htmlNode = null;

    this.post.comments.push(this);
    this.display();
};

Comment.prototype.display = function() {
    if (this.htmlNode == null) {

        var commentNode = $("<li/>")
            .html(this.text);

        var deleteButton = $("<button/>")
            .on({
                click: $.proxy(this.onDeleteClick, this)
            })
            .html("delete comment");


        commentNode.append(deleteButton);

        this.htmlNode = commentNode;


        this.post.htmlNode.comments.append(this.htmlNode);
    }
};

Comment.prototype.onDeleteClick = function(evt) {
    this.delete();
};

Comment.prototype.delete = function() {
    this.htmlNode.remove();
    this.post.comments.removeItem(this);
};