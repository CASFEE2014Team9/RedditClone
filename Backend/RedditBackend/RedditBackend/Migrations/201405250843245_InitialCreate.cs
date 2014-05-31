namespace RedditBackend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        ParentCategory_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Categories", t => t.ParentCategory_Id)
                .Index(t => t.ParentCategory_Id);
            
            CreateTable(
                "dbo.Posts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Image = c.String(),
                        Description = c.String(),
                        Text = c.String(),
                        Url = c.String(),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                        Creator_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Creator_Id)
                .Index(t => t.Creator_Id);
            
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Creator_Id = c.Int(),
                        Post_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Creator_Id)
                .ForeignKey("dbo.Posts", t => t.Post_Id)
                .Index(t => t.Creator_Id)
                .Index(t => t.Post_Id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Password = c.String(),
                        Email = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Ratings",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Creator_Id = c.Int(),
                        Post_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Creator_Id)
                .ForeignKey("dbo.Posts", t => t.Post_Id)
                .Index(t => t.Creator_Id)
                .Index(t => t.Post_Id);
            
            CreateTable(
                "dbo.UserGroups",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.UseCases",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PostCategories",
                c => new
                    {
                        Post_Id = c.Int(nullable: false),
                        Category_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Post_Id, t.Category_Id })
                .ForeignKey("dbo.Posts", t => t.Post_Id, cascadeDelete: true)
                .ForeignKey("dbo.Categories", t => t.Category_Id, cascadeDelete: true)
                .Index(t => t.Post_Id)
                .Index(t => t.Category_Id);
            
            CreateTable(
                "dbo.UseCaseUserGroups",
                c => new
                    {
                        UseCase_Id = c.Int(nullable: false),
                        UserGroup_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.UseCase_Id, t.UserGroup_Id })
                .ForeignKey("dbo.UseCases", t => t.UseCase_Id, cascadeDelete: true)
                .ForeignKey("dbo.UserGroups", t => t.UserGroup_Id, cascadeDelete: true)
                .Index(t => t.UseCase_Id)
                .Index(t => t.UserGroup_Id);
            
            CreateTable(
                "dbo.UserGroupUsers",
                c => new
                    {
                        UserGroup_Id = c.Int(nullable: false),
                        User_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.UserGroup_Id, t.User_Id })
                .ForeignKey("dbo.UserGroups", t => t.UserGroup_Id, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.User_Id, cascadeDelete: true)
                .Index(t => t.UserGroup_Id)
                .Index(t => t.User_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Comments", "Post_Id", "dbo.Posts");
            DropForeignKey("dbo.UserGroupUsers", "User_Id", "dbo.Users");
            DropForeignKey("dbo.UserGroupUsers", "UserGroup_Id", "dbo.UserGroups");
            DropForeignKey("dbo.UseCaseUserGroups", "UserGroup_Id", "dbo.UserGroups");
            DropForeignKey("dbo.UseCaseUserGroups", "UseCase_Id", "dbo.UseCases");
            DropForeignKey("dbo.Ratings", "Post_Id", "dbo.Posts");
            DropForeignKey("dbo.Ratings", "Creator_Id", "dbo.Users");
            DropForeignKey("dbo.Posts", "Creator_Id", "dbo.Users");
            DropForeignKey("dbo.Comments", "Creator_Id", "dbo.Users");
            DropForeignKey("dbo.PostCategories", "Category_Id", "dbo.Categories");
            DropForeignKey("dbo.PostCategories", "Post_Id", "dbo.Posts");
            DropForeignKey("dbo.Categories", "ParentCategory_Id", "dbo.Categories");
            DropIndex("dbo.Comments", new[] { "Post_Id" });
            DropIndex("dbo.UserGroupUsers", new[] { "User_Id" });
            DropIndex("dbo.UserGroupUsers", new[] { "UserGroup_Id" });
            DropIndex("dbo.UseCaseUserGroups", new[] { "UserGroup_Id" });
            DropIndex("dbo.UseCaseUserGroups", new[] { "UseCase_Id" });
            DropIndex("dbo.Ratings", new[] { "Post_Id" });
            DropIndex("dbo.Ratings", new[] { "Creator_Id" });
            DropIndex("dbo.Posts", new[] { "Creator_Id" });
            DropIndex("dbo.Comments", new[] { "Creator_Id" });
            DropIndex("dbo.PostCategories", new[] { "Category_Id" });
            DropIndex("dbo.PostCategories", new[] { "Post_Id" });
            DropIndex("dbo.Categories", new[] { "ParentCategory_Id" });
            DropTable("dbo.UserGroupUsers");
            DropTable("dbo.UseCaseUserGroups");
            DropTable("dbo.PostCategories");
            DropTable("dbo.UseCases");
            DropTable("dbo.UserGroups");
            DropTable("dbo.Ratings");
            DropTable("dbo.Users");
            DropTable("dbo.Comments");
            DropTable("dbo.Posts");
            DropTable("dbo.Categories");
        }
    }
}
