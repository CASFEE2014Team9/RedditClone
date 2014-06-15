function Context() {
    this.posts = [];

    this.user = userFromCookie(this);

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
