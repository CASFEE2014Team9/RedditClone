function Context() {
    this.posts = [];

    this.user = userFromCookie();

    if (this.user.name != anonymous)
    {
        this.user.login();
    }
    else
    {
        this.user.display();
    }

    this.postTableNode = $("#linkContentTable");
};

var createTestContext = function(){
    var result = new Context();
    result.user = createTestUser();
    result.postTableNode = $("<ul>");

    return result;
};
