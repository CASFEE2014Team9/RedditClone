var createTestContext = function(){
    var result = new Context();
    result.user = createTestUser(result);
    result.postTableNode = $("<ul>");

    return result;
};