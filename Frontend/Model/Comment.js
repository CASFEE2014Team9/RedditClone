function Comment(post,commentText) {

    this.text = commentText;
    this.post = post;
    this.htmlNode = null;

    this.post.comments.push(this);
    this.display();
};

Comment.prototype.display = function() {
    if (this.htmlNode == null) {
        this.htmlNode = $("<li/>")
            .html(this.text);

        this.post.htmlNode.append(this.htmlNode);
    }
};