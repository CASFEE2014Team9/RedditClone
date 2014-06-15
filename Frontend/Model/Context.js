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
