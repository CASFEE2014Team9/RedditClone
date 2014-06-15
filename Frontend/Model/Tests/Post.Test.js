QUnit.test( "create Post", function( assert ) {
    window.context = createTestContext();

    var testUser = createTestUser();

    assert.equal( window.context.postTableNode.children().length, 0, "no posts should be displayed" );

    var post = new Post(testUser,"www.google.com", "description" );

    assert.equal( window.context.postTableNode.children().length, 1, "created posts should be displayed" );
    assert.ok( window.context.posts.contains( post ), "created posts are present in the context" );

    post.delete();

    assert.equal( window.context.postTableNode.children().length, 0, "no posts should be displayed" );
    assert.ok( !window.context.posts.contains( post ), "deleted posts are present not in the context" );
});
