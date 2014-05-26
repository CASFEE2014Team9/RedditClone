function OnBodyLoaded()
{
	// var addLinkButton = docum.getElementById( "addLinkButton" );
	// addLinkButton.onclick = onAddLinkButtonClicked;
}

function OnAddLinkButtonClicked()
{
    var webAddress = document.getElementById( "webAddress" );
    var innerHTML = document.getElementById( "innerHTML" );
    
    AddLinkElementToList( webAddress.value, innerHTML.value );
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

    var linkElement = document.createElement( "a" );
    linkElement .href = link;
    linkElement .innerHTML = text;


    var linkDivElement = document.createElement( "div" );
    linkDivElement .appendChild( linkElement );

    var tableDivElement = document.getElementById( "linkContentTable" );
    tableDivElement .appendChild( linkDivElement );
}
