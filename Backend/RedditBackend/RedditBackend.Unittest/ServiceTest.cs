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
            //http://localhost:49980/Reddit.svc/CreatePost?description='gugus'
            var service = new RedditService();

            using (var model = new RedditModelContainer())
            {
                var post = service.CreatePost("gugus");
            }
        }

        [TestMethod]
        public void TestUpdatePost()
        {
            //http://localhost:49980/Reddit.svc/UpdatePost?postId=22&description='gugus2'
            var service = new RedditService();

            using (var model = new RedditModelContainer())
            {
                var post = model.Posts.FirstOrDefault() ?? service.CreatePost("gugus1");

                var updatedpost = service.UpdatePost(post.Id, "gugus2");
            }
        }

        [TestMethod]
        public void TestDeletePost()
        {
            //http://localhost:49980/Reddit.svc/DeletePost?PostId=5
            var service = new RedditService();

            using (var model = new RedditModelContainer())
            {
                foreach (var post in model.Posts)
                {
                    service.DeletePost(post.Id);
                }
            }
        }
    }
}
