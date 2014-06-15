QUnit.test( "create / delete Comment", function( assert ) {
    window.context = createTestContext();

    var testUser = createTestUser();
    var testPost = createTestPost(testUser);

    assert.equal( testPost.htmlNode.comments.children().length, 0, "no comments should be displayed" );

    var comment = new Comment(testUser, testPost, "troll" );

    assert.equal( testPost.htmlNode.comments.children().length, 1, "created comments should be displayed" );
    assert.ok( testPost.comments.contains( comment ), "created comments are present in the post" );

    comment.delete();

    assert.equal( testPost.htmlNode.comments.children().length, 0, "no comments should be displayed" );
    assert.ok( !testPost.comments.contains( comment ), "deleted comments are not present in the post" );
});

