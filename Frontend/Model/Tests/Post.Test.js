QUnit.test( "create / delete Post", function( assert ) {
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
