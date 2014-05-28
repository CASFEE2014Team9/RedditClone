function OnBodyLoaded()
{
    $(".entry").on(
    {
        mouseenter : OnElementMouseEntered,
        mouseout : OnElementMouseLeft
    });
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

    var $linkContent = $("#linkContentTable");

    $linkContent
        .append($("<li/>")
            .addClass("entry")
            .append($("<a/>")
                .attr("href",link)
                .html(text)
            )
            .on(
            {
                mouseenter : OnElementMouseEntered,
                mouseout : OnElementMouseLeft
            })
        );

    $linkContent
        .find("li:odd")
            .css("background","LightGrey");

    $("body").css("background","DarkGray" );
}
