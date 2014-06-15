var createTestComment = function( testUser, testPost )
{
    var result = new Comment(testUser.context, testUser, testPost, "troll" );
    return result;
};

QUnit.module( "Comment" );
QUnit.test( "create / delete Comment", function( assert ) {
    var testContext = createTestContext();
    var testUser = createTestUser(testContext);
    var testPost = createTestPost(testUser);

    assert.equal( testPost.htmlNode.comments.children().length, 0, "no comments should be displayed" );

    var comment = createTestComment(testUser, testPost );

    assert.equal( testPost.htmlNode.comments.children().length, 1, "created comments should be displayed" );
    assert.ok( testPost.comments.contains( comment ), "created comments are present in the post" );

    comment.delete();

    assert.equal( testPost.htmlNode.comments.children().length, 0, "no comments should be displayed" );
    assert.ok( !testPost.comments.contains( comment ), "deleted comments are not present in the post" );
});

QUnit.test( "create with wrong arguments", function( assert ) {
    var testContext = createTestContext();
    var testUser = createTestUser(testContext);
    var testPost = createTestPost(testUser);

    assert.throws(
        function() {
            var comment = new Comment("no user", testPost, "lala");
        },
        TypeError
        , "creator must be a User"
    );

    assert.throws(
        function() {
            var comment = new Comment(testUser, "no post", "lala");
        },
        TypeError
        , "post must be a Post"
    );
});

