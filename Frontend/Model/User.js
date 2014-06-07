function User(name, password) {
    this.name = name;
    this.password = password;
    this.posts = [];
    this.htmlNode =  $($(".login")[0]);
};

var userFromCookie = function()
{
    if (!docCookies.hasItem("name"))
    {
        return null;
    }
    var name = docCookies.getItem("name");
    var password = docCookies.getItem("password");
    var user = new User(name, password);

    return user;
};

User.prototype.login = function(){
    window.user = this;

    docCookies.setItem("name",this.name);
    docCookies.setItem("password",this.password);

    this.htmlNode.empty();

    var logoutView = $("<div/>")
        .html(this.name)
        .append($("<button/>")
            .html("logout")
            .on({
                click: $.proxy(this.logout, this)
            })
        );

    this.htmlNode.append(logoutView);
};

User.prototype.logout = function(){
    window.user = null;

    docCookies.removeItem("name");
    docCookies.removeItem("password");
};


