function Comment(creator,post,commentText) {
    guardCustomType(creator, "creator", User );
    guardCustomType(post, "post", Post );
    guardString(commentText, "commentText" );

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
    handleError( "DeleteComment", this, function ()
    {
        this.delete();
    });
};

Comment.prototype.delete = function() {
    this.htmlNode.remove();
    this.post.comments.removeItem(this);
};