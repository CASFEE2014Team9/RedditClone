function User(name, password) {
    this.name = name;
    this.password = password;
    this.posts = [];
    this.htmlNode =  $($(".login")[0]);
    this.loginstate = UserLoginState.LoggedOut;
};


var UserLoginState = {
    LoggedOut : {value: 0, name: "LoggedOut"},
    LoggedIn:   {value: 1, name: "LoggedIn"}
};

var anonymous = "anonymous";

var userFromCookie = function(){
    if (!docCookies.hasItem("name"))
    {
        return new User(anonymous);
    }
    var name = docCookies.getItem("name");
    var password = docCookies.getItem("password");
    var user = new User(name, password);

    return user;
};

User.prototype.display = function(){
    this.htmlNode.empty();

    if (this.loginstate == UserLoginState.LoggedIn)
    {
        this.htmlNode.append($("<label/>")
            .html(this.name));

        this.htmlNode.append($("<button/>")
                .html("logout")
                .on({
                    click: $.proxy(this.logout, this)
                })
        );
    }
    else if (this.loginstate == UserLoginState.LoggedOut)
    {
        this.htmlNode.append($("<Button/>")
                .html("login")
                .on({
                    click: $.proxy(this.onLoginClick, this)
                })
        );
    }
};

User.prototype.onLoginClick = function(){
    ShowLoginDialog();
};

var ShowLoginDialog = function()
{
    window.loginDialog.dialog( "open" );
};

User.prototype.login = function(){
    window.user = this;

    docCookies.setItem("name",this.name);
    docCookies.setItem("password",this.password);

    this.loginstate = UserLoginState.LoggedIn;

    this.display();
};

User.prototype.logout = function(){
    window.user = null;

    docCookies.removeItem("name");
    docCookies.removeItem("password");

    this.loginstate = UserLoginState.LoggedOut;

    this.display();
};


