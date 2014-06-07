function OnBodyLoaded()
{
    window.posts = [];
    window.user = null;

    var user = userFromCookie();

    if (user.name != anonymous)
    {
        user.login();
    }
    else
    {
        user.display();
    }

    GetPosts();
}

function OnAddLinkButtonClicked()
{
    var address = $("#webAddress").val();
    var text = $("#innerHTML").val();
    new Post(address, text);
}

function GetPosts()
{
   // OData.read("http://localhost:49980/Reddit.svc/Posts/?$format=json", function (data, response) {

     //   console.dir(data);
//success handler

   // });

    new Post("http://espn.go.com/nhl","Sports World: ESPN NHL");
}
