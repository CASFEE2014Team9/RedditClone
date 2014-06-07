function Post( link, text ) {
    if (link == "") {
        // show box
        return;
    }

    if (text == undefined || text == "") {
        text = link;
    }

    this.url = link;
    this.description = text;
    this.comments = [];
    this.htmlNode = null;

    window.posts.push(this);
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
            .append($("<button/>")
                .on({
                    click: $.proxy(this.onAddCommentClick, this)
                })
                .html("add comment")
        );

        this.htmlNode.commentInput = $("<input/>")
            .attr("type", "text")
            .attr("name", "commentInput");

        this.htmlNode.append(this.htmlNode.commentInput);

        $("#linkContentTable").append(this.htmlNode);
    }

    this.comments.forEach(function(comment) {
        comment.display();
    });
};

Post.prototype.onAddCommentClick = function(evt) {
    new Comment(this, this.htmlNode.commentInput.val());
};

function OnElementMouseEntered()
{
    $(this).css("background", "lightBlue");
}
function OnElementMouseLeft()
{
    $(this).css("background", "transparent");
}