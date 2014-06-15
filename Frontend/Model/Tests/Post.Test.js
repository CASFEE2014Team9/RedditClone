QUnit.module( "Post" );
QUnit.test( "create / delete", function( assert ) {
    window.context = createTestContext();

    var testUser = createTestUser();

    assert.equal( window.context.postTableNode.children().length, 0, "no posts should be displayed" );

    var post = createTestPost(testUser);

    assert.equal( window.context.postTableNode.children().length, 1, "created posts should be displayed" );
    assert.ok( window.context.posts.contains( post ), "created posts are present in the context" );

    post.delete();

    assert.equal( window.context.postTableNode.children().length, 0, "no posts should be displayed" );
    assert.ok( !window.context.posts.contains( post ), "deleted posts are not present in the context" );
});

QUnit.test( "create with wrong arguments", function( assert ) {
    window.context = createTestContext();

    assert.throws(
        function() {
            var post = new Post("no user object", "lala", "lala");
        },
        TypeError
        , "creator must be a User"
    );
});
