function OnBodyLoaded()
{
	// var addLinkButton = docum.getElementById( "addLinkButton" );
	// addLinkButton.onclick = onAddLinkButtonClicked;
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

    $("#linkContentTable")
        .append($("<li/>")
            .addClass("entry")
            .append( $("<a/>")
                .attr("href",link)
                .html(text)
            )
        );

    $("#linkContentTable")
        .find("li:odd")
            .css("background","LightGrey");

    $("body").css("background","DarkGray" );
}
