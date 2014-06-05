function OnBodyLoaded()
{
    $(".entry").on(
    {
        mouseenter : OnElementMouseEntered,
        mouseout : OnElementMouseLeft
    });

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
    AddLinkElementToList( $("#webAddress").val(), $("#innerHTML").val() );
}

function AddLinkElementToList( link, text )
{
    if( link == "" )
    {
    	// show box
    	return;
    }
    
    if( text == undefined || text == "" )
    {
    	text = link;
    }

    var post =
    {
        url:link,
        description:text
    };

    window.posts.push(post);

    DisplayPosts();
}

function GetPosts()
{
   // OData.read("http://localhost:49980/Reddit.svc/Posts/?$format=json", function (data, response) {

     //   console.dir(data);
//success handler

   // });

    var post =
    {
        url:"http://espn.go.com/nhl",
        description:"Sports World: ESPN NHL"
    };

    var posts = [];

    posts.push(post);

    OnPostsReceived(posts)
}

function OnPostsReceived(posts)
{
    window.posts = posts;

    DisplayPosts();
}

function DisplayPosts()
{
    var $linkContent = $("#linkContentTable");

    $linkContent.empty();

    window.posts.forEach(function(post)
    {
        $linkContent
            .append($("<li/>")
                .addClass("entry")
                .append($("<a/>")
                    .attr("href",post.url)
                    .html(post.description)
                )
                .on(
                {
                    mouseenter : OnElementMouseEntered,
                    mouseout : OnElementMouseLeft
                })
        );
    });
}
