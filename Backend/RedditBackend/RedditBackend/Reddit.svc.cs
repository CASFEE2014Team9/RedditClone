using System.Data.Services;
using System.Data.Services.Providers;

namespace RedditBackend
{
    [JSONPSupportBehavior]
    public class Reddit : EntityFrameworkDataService<RedditModelContainer>
    {
        public static void InitializeService(DataServiceConfiguration configuration)
        {
            configuration.SetEntitySetAccessRule("*", EntitySetRights.All);
            configuration.UseVerboseErrors = true;

        }
    }
}
