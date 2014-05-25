using System;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace RedditBackend.Unittest
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            using (var context = new RedditModelContainer())
            {
                var users = context.Users.AsQueryable();

                var userlist = users.ToList();

                //http://localhost:49980/Reddit.svc/Users/?$format=json
            }
        }
    }
}
