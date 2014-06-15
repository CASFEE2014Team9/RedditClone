function Post( creator, link, title, description ) {
    if (link == "") {
        // show box
        return;
    }

    if (title == undefined || title == "") {
        title = link;
    }

    if ( !(creator instanceof User) )
    {
        throw new TypeError("Parameter creator must be of type User");
    }

    this.creator = creator;
    this.url = link;
    this.title = title;
    this.description = description;
    this.comments = [];
    this.htmlNode = null;

    window.context.posts.push(this);
    this.display();
}

Post.prototype.display = function() {
    if (this.htmlNode == null)
    {
        var postNode = $("<li/>")
            .addClass("post")
            .on({
                mouseenter: OnElementMouseEntered,
                mouseout: OnElementMouseLeft
            });

        var title = $("<a/>")
            .attr("href",this.url)
            .html(this.title);

        var description = $("<p>")
            .text(this.description);

        var voteUp = $("<button/>")
            .on({
                click: $.proxy(this.onVoteUpClick, this)
            })
            .html("vote up");

        var voteDown = $("<button/>")
            .on({
                click: $.proxy(this.onVoteDownClick, this)
            })
            .html("vote down");

        var deleteButton = $("<button/>")
            .on({
                click: $.proxy(this.onDeleteClick, this)
            })
            .html("delete post");

        var addCommentButton = $("<button/>")
            .on({
                click: $.proxy(this.onAddCommentClick, this)
            })
            .html("add comment");

        var commentInput = $("<input/>")
            .attr("type", "text")
            .attr("name", "commentInput");

        var rating = $("<div/>")
            .addClass("postRating");
        var content = $("<div/>")
            .addClass("postContent");
        var detail = $("<div/>")
            .addClass("postDetail");
        var header = $("<header>");

        var comments = $("<div/>")
            .addClass("postComments");

        header.append(title);
        postNode.append(header);

        rating.append(voteUp);
        rating.append(voteDown);
        postNode.append(rating);


        detail.append(description);
        detail.append(deleteButton);
        detail.append(commentInput);
        detail.append(addCommentButton);

        content.append(rating);
        content.append(detail);

        postNode.append(content);
        postNode.append(comments);

        this.htmlNode = postNode;
        this.htmlNode.commentInput = commentInput;
        this.htmlNode.comments = comments;

        window.context.postTableNode.append(this.htmlNode);
    }

    this.comments.forEach(function(comment) {
        comment.display();
    });
};

Post.prototype.onAddCommentClick = function(evt) {
    new Comment(window.user, this, this.htmlNode.commentInput.val());
};

Post.prototype.onDeleteClick = function(evt) {
    this.delete();
};

Post.prototype.delete = function() {
    this.htmlNode.remove();
    window.context.posts.removeItem(this);
};

Post.prototype.onVoteUpClick = function(evt) {
};

Post.prototype.onVoteDownClick = function(evt) {
};


function OnElementMouseEntered()
{
    $(this).css("background", "lightBlue");
}
function OnElementMouseLeft()
{
    $(this).css("background", "transparent");
}