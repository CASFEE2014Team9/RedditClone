function OnBodyLoaded()
{
    window.posts = [];
    GetPosts();
}

function OnAddLinkButtonClicked()
{
    new Post($("#webAddress").val(), $("#innerHTML").val());
}

function GetPosts()
{
   // OData.read("http://localhost:49980/Reddit.svc/Posts/?$format=json", function (data, response) {

     //   console.dir(data);
//success handler

   // });

    new Post("http://espn.go.com/nhl","Sports World: ESPN NHL");
}
