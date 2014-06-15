function Post( creator, link, text ) {
    if (link == "") {
        // show box
        return;
    }

    if (text == undefined || text == "") {
        text = link;
    }

    this.creator = creator;
    this.url = link;
    this.description = text;
    this.comments = [];
    this.htmlNode = null;

    window.context.posts.push(this);
    this.display();
}

Post.prototype.display = function() {
    if (this.htmlNode == null)
    {
        this.htmlNode = $("<li/>")
            .addClass("entry")
            .append($("<a/>")
                .attr("href",this.url)
                .html(this.description)
            )
            .on({
                mouseenter : OnElementMouseEntered,
                mouseout : OnElementMouseLeft
            })
            .append($("<div>")
                .text("All american sports information you can imagine: results, schedules, team information, statistics and background stories about specific issues.")
            )
            .append($("<button/>")
                .on({
                    click: $.proxy(this.onAddCommentClick, this)
                })
                .html("add comment")
            );

        this.htmlNode.delete = $("<button/>")
            .on({
                click: $.proxy(this.onDeleteClick, this)
            })
            .html("delete post");
        this.htmlNode.append(this.htmlNode.delete);

        this.htmlNode.commentInput = $("<input/>")
            .attr("type", "text")
            .attr("name", "commentInput");
        this.htmlNode.append(this.htmlNode.commentInput);

        this.htmlNode.voteUp = $("<button/>")
            .on({
                click: $.proxy(this.onVoteUpClick, this)
            })
            .html("vote up");
        this.htmlNode.append(this.htmlNode.voteUp);

        this.htmlNode.voteDown = $("<button/>")
            .on({
                click: $.proxy(this.onVoteDownClick, this)
            })
            .html("vote down");
        this.htmlNode.append(this.htmlNode.voteDown);

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