function OnBodyLoaded()
{
    GetPosts();
}

function OnElementMouseEntered()
{
    $(this).css("background", "lightBlue");
}
function OnElementMouseLeft()
{
    $(this).css("background", "transparent");
}

function OnAddLinkButtonClicked()
{
    CreatePost( $("#webAddress").val(), $("#innerHTML").val() );
}

function CreatePost( link, text )
{
    if( link == "" ) {
    	// show box
    	return;
    }
    
    if( text == undefined || text == "" ) {
    	text = link;
    }

    var post = {
        url:link,
        description:text,
        comments:[],
        htmlNode:null,
        onAddCommentClick:function(evt){
            var comment = {
                text: this.htmlNode.commentInput.val(),
                post: this,
                htmlNode: null,
                display:function(){
                    if ( this.htmlNode == null )
                    {
                        this.htmlNode = $("<li/>")
                            .html(this.text);

                        this.post.htmlNode.append(this.htmlNode);
                    }
                }
            };

            this.comments.push(comment);
            comment.display();
        },
        display:function(){
            if ( this.htmlNode == null )
            {
                this.htmlNode = $("<li/>")
                    .addClass("entry")
                    .append($("<a/>")
                        .attr("href",post.url)
                        .html(post.description)
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
        }
    };

    window.posts.push(post);
    post.display();
}

function GetPosts()
{
   // OData.read("http://localhost:49980/Reddit.svc/Posts/?$format=json", function (data, response) {

     //   console.dir(data);
//success handler

   // });

    window.posts = [];
    CreatePost("http://espn.go.com/nhl","Sports World: ESPN NHL");
}
