var createTestContext = function(){
    var result = new Context();
    result.user = createTestUser();
    result.postTableNode = $("<ul>");

    return result;
};