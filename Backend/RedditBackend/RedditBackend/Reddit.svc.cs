using System.Data.Services;
using System.Data.Services.Common;
using System.Data.Services.Providers;
using System.Linq;
using System.ServiceModel.Web;

namespace RedditBackend
{
    [JSONPSupportBehavior]
    public class RedditService : EntityFrameworkDataService<RedditModelContainer>
    {
        public static void InitializeService(DataServiceConfiguration configuration)
        {
            configuration.SetEntitySetAccessRule("*", EntitySetRights.All);
            configuration.UseVerboseErrors = true;
            configuration.SetServiceOperationAccessRule("*", ServiceOperationRights.All);
            configuration.SetServiceActionAccessRule("*", ServiceActionRights.Invoke);

            configuration.DataServiceBehavior.MaxProtocolVersion = DataServiceProtocolVersion.V3;
        }

        [WebInvoke(Method = "POST",
                    RequestFormat = WebMessageFormat.Json,
                    ResponseFormat = WebMessageFormat.Json,
                    UriTemplate = "CreatePost",
                    BodyStyle = WebMessageBodyStyle.Wrapped)]
        public Post CreatePost(string description)
        {
            Post post = null;
            using (var model = new RedditModelContainer())
            {
                post = new Post();
                post.Creator = model.Users.FirstOrDefault();
                post.Description = description;

                model.Posts.Add(post);

                model.SaveChanges();
            }

            return post;
        }

        [WebInvoke(Method = "POST",
                    RequestFormat = WebMessageFormat.Json,
                    ResponseFormat = WebMessageFormat.Json,
                    UriTemplate = "UpdatePost",
                    BodyStyle = WebMessageBodyStyle.Wrapped)]
        public Post UpdatePost(int postId, string description)
        {
            Post post = null;
            using (var model = new RedditModelContainer())
            {
                post = model.Posts.Find(postId);

                //if ( user != post.Creator && !Admin )
                {
                    //return;
                }

                if (post != null)
                {
                    post.Description = description;
                    model.SaveChanges();
                }
            }

            return post;
        }

        [WebInvoke(Method = "POST",
                    RequestFormat = WebMessageFormat.Json,
                    ResponseFormat = WebMessageFormat.Json,
                    UriTemplate = "DeletePost",
                    BodyStyle = WebMessageBodyStyle.Wrapped)]
        public void DeletePost(int postId)
        {
            using (var model = new RedditModelContainer())
            {
                var foundpost = model.Posts.Find(postId);

                //if ( user != post.Creator && !Admin )
                {
                    //return;
                }

                if (foundpost != null)
                {
                    model.Posts.Remove(foundpost);

                    model.SaveChanges();
                }
            }
        }
    }
}
