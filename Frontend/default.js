function OnBodyLoaded()
{
    var loginDialog = $( "#loginDialog").dialog({
        autoOpen: false
        });
    loginDialog.loginInput = $( "#loginDialogLoginInput");
    loginDialog.passwordInput = $( "#loginDialogPasswordInput");
    loginDialog.loginButton = $( "#loginDialogLoginButton");
    loginDialog.onLoginButtonClick = function() {
        var name = loginDialog.loginInput.val();
        var password = loginDialog.passwordInput.val();

        var user = new User(loginDialog.context, name, password);
        user.login();

        loginDialog.dialog( "close" );
    };

    loginDialog.loginButton.on( {
        click: loginDialog.onLoginButtonClick
    } );

    var context = new Context();
    context.loginDialog = loginDialog;
    loginDialog.context = context;
    window.context = context;

    GetPosts();
}

function OnAddLinkButtonClicked(){
    handleError( "Addpost", this, function ()
    {
        var address = $("#webAddress").val();
        var text = $("#innerHTML").val();
        new Post(window.context, window.context.user, address, text);
    });
}

function GetPosts()
{
   // OData.read("http://localhost:49980/Reddit.svc/Posts/?$format=json", function (data, response) {

     //   console.dir(data);
//success handler

   // });
    new Post(window.context, window.context.user, "http://espn.go.com/nhl", "Sports World: ESPN NHL","All american sports information you can imagine: results, schedules, team information, statistics and background stories about specific issues.");
}
