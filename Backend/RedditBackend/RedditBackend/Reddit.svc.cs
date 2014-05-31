using System.Data.Services;
using System.Data.Services.Providers;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Web;

namespace RedditBackend
{
    [JSONPSupportBehavior]
    public class RedditService : EntityFrameworkDataService<RedditModelContainer>
    {
        public static void InitializeService(DataServiceConfiguration configuration)
        {
            configuration.SetEntitySetAccessRule("*", EntitySetRights.All);
            configuration.UseVerboseErrors = true;
        }

        //public Post CreatePost(Post post, string id)
        //{
        //    using (var model = new RedditModelContainer())
        //    {
        //        post.Creator = model.Users.FirstOrDefault();

        //        model.Posts.Add(post);

        //        model.SaveChanges();
        //    }

        //    return post;
        //}

        //public void DeletePost(int postId)
        //{
        //    using (var model = new RedditModelContainer())
        //    {
        //        var foundpost = model.Posts.Find(postId);

        //        //if ( user != post.Creator && !Admin )
        //        {
        //            //return;
        //        }

        //        model.Posts.Remove(foundpost);

        //        model.SaveChanges();
        //    }
        //}
    }
}
