var createTestRating = function( testUser, testPost )
{
    var result = new Rating(testUser.context, testUser ,testPost, 100 );
    return result;
};

QUnit.module( "Rating" );
QUnit.test( "create / delete", function( assert ) {
    var testContext = createTestContext();
    var testUser = createTestUser(testContext);
    var testPost = createTestPost(testUser);

    var rating = createTestRating(testUser, testPost );

    assert.ok( testPost.ratings.contains( rating ), "created ratings are present in the post" );

    rating.delete();

    assert.ok( !testPost.ratings.contains( rating ), "deleted ratings are not present in the post" );
});

QUnit.test( "create with wrong arguments", function( assert ) {
    var testContext = createTestContext();
    var testUser = createTestUser(testContext);
    var testPost = createTestPost(testUser);

    assert.throws(
        function() {
            var rating = new Rating("no user", testPost, 100);
        },
        TypeError
        , "creator must be a User"
    );

    assert.throws(
        function() {
            var rating = new Rating(testUser, "no post", 100);
        },
        TypeError
        , "post must be a Post"
    );
});