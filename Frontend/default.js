function OnBodyLoaded()
{
    window.posts = [];
    window.user = null;

    var user = userFromCookie();

    if (user != null)
    {
        user.login();
    }

    GetPosts();
}

function OnAddLinkButtonClicked()
{
    var address = $("#webAddress").val();
    var text = $("#innerHTML").val();
    new Post(address, text);
}

function OnLoginButtonClicked()
{
    var userName = $("#userName").val();
    var password = $("#password").val();
    var user = new User(userName, password);
    user.login();
}

function GetPosts()
{
   // OData.read("http://localhost:49980/Reddit.svc/Posts/?$format=json", function (data, response) {

     //   console.dir(data);
//success handler

   // });

    new Post("http://espn.go.com/nhl","Sports World: ESPN NHL");
}
