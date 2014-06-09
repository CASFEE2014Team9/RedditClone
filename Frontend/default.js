function OnBodyLoaded()
{
    window.posts = [];
    window.user = null;
    window.PostTableNode = $("#linkContentTable");

    window.loginDialog = $( "#loginDialog").dialog({
        autoOpen: false
        });
    window.loginDialog.loginInput = $( "#loginDialogLoginInput");
    window.loginDialog.passwordInput = $( "#loginDialogPasswordInput");
    window.loginDialog.loginButton = $( "#loginDialogLoginButton");
    window.loginDialog.onLoginButtonClick = function() {
        var name = loginDialog.loginInput.val();
        var password = loginDialog.passwordInput.val();

        var user = new User(name,password);
        user.login();

        window.loginDialog.dialog( "close" );
    };

    window.loginDialog.loginButton.on( {
        click: window.loginDialog.onLoginButtonClick
    } );

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
    new Post(window.user, address, text);
}

function GetPosts()
{
   // OData.read("http://localhost:49980/Reddit.svc/Posts/?$format=json", function (data, response) {

     //   console.dir(data);
//success handler

   // });

    new Post("http://espn.go.com/nhl","Sports World: ESPN NHL");
}
