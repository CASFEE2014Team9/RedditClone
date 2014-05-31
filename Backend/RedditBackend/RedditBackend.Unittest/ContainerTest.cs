using System;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace RedditBackend.Unittest
{
    [TestClass]
    public class ContainerTest
    {
        [TestMethod]
        public void TestRetrieveUsers()
        {
            using (var context = new RedditModelContainer())
            {
                var users = context.Users.AsQueryable();

                var userlist = users.ToList();

                //http://localhost:49980/Reddit.svc/Users/?$format=json
            }
        }

        [TestMethod]
        public void TestRetrievePosts()
        {
            using (var context = new RedditModelContainer())
            {
                var posts = context.Posts.AsQueryable();

                var postlist = posts.ToList();

                //http://localhost:49980/Reddit.svc/Posts/?$format=json
            }
        }
    }
}
