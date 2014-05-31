namespace RedditBackend.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<RedditBackend.RedditModelContainer>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(RedditModelContainer context)
        {
            //  This method will be called after migrating to the latest version.

            context.Users.AddOrUpdate(
              p => p.Name,
              new User { Name = "Administrator" },
              new User { Name = "Anonymous" }
            );
        }
    }
}
