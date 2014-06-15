var createTestPost = function( testUser )
{
    var result = new Post(testUser.context, testUser,"www.google.com", "Google", "Description" );
    return result;
};

QUnit.module( "Post" );
QUnit.test( "create / delete", function( assert ) {
    var testContext = createTestContext();
    var testUser = createTestUser(testContext);

    assert.equal( testContext.postTableNode.children().length, 0, "no posts should be displayed" );

    var post = createTestPost(testUser);

    assert.equal( testContext.postTableNode.children().length, 1, "created posts should be displayed" );
    assert.ok( testContext.posts.contains( post ), "created posts are present in the context" );

    post.delete();

    assert.equal( testContext.postTableNode.children().length, 0, "no posts should be displayed" );
    assert.ok( !testContext.posts.contains( post ), "deleted posts are not present in the context" );
});

QUnit.test( "create with wrong arguments", function( assert ) {
    var testContext = createTestContext();
    var testUser = createTestUser(testContext);

    assert.throws(
        function() {
            var post = new Post("no user object", "url", "title", "description");
        },
        TypeError
        , "creator must be a User"
    );

    assert.throws(
        function() {
            var post = new Post(testUser, null, "title", "description");
        },
        TypeError
        , "url must not be a null"
    );
});
