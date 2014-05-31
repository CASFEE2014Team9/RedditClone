using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace RedditBackend.Unittest
{
    [TestClass]
    public class ServiceTest
    {
        [TestMethod]
        public void TestCreatePost()
        {
            var service = new RedditService();

            using (var model = new RedditModelContainer())
            {
                //var post = service.CreatePost(new UrlPost()
                //{
                //    Description = "test",
                //}, null);
            }
        }

        [TestMethod]
        public void TestDeletePost()
        {
            var service = new RedditService();

            using (var model = new RedditModelContainer())
            {
                //foreach (var post in model.Posts)
                //{
                //    service.DeletePost(post.Id);
                //}
            }
        }

        [TestMethod]
        public void TestRetrievePosts()
        {
            var service = new RedditService();

        }
    }
}
