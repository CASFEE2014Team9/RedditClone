function OnBodyLoaded()
{
    window.context = new Context();

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

    GetPosts();
}

function OnAddLinkButtonClicked()
{
    var address = $("#webAddress").val();
    var text = $("#innerHTML").val();
    new Post(window.context.user, address, text);
}

function GetPosts()
{
   // OData.read("http://localhost:49980/Reddit.svc/Posts/?$format=json", function (data, response) {

     //   console.dir(data);
//success handler

   // });
    new Post(window.context.user, "http://espn.go.com/nhl", "Sports World: ESPN NHL","All american sports information you can imagine: results, schedules, team information, statistics and background stories about specific issues.");
}
