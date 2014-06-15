var createTestUser = function(context){
    var result = new User(context, "test", "test");
    result.htmlNode = $("<div>").addClass( "login" );

    return result;
};

QUnit.module( "User" );
QUnit.test( "login", function( assert ) {
    var testContext = createTestContext();
    var testUser = createTestUser(testContext);
    assert.equal( testUser.loginstate, UserLoginState.LoggedOut, "Created users are logged out" );

    testUser.login();
    assert.equal( testUser.loginstate, UserLoginState.LoggedIn, "after login was called a user is logged in" );

    testUser.logout();
    assert.equal( testUser.loginstate, UserLoginState.LoggedOut, "after logout was called a user is logged out" );
});