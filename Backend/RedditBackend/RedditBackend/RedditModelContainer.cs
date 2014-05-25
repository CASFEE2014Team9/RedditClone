using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Data.Services;
using System.Linq;
using System.Web;

namespace RedditBackend
{
    public partial class RedditModelContainer : IRedditModel
    {
        partial void OnInitialized()
        {
            if (!Users.Any())
            {
                Users.Add(new User() { Name = "TestUser1" });
                Users.Add(new User() { Name = "TestUser2" });

                SaveChanges();
            }
        }

        IQueryable<User> IRedditModel.Users
        {
            get { return Users.OfType<User>().AsQueryable(); }
        }

        IQueryable<Rating> IRedditModel.Ratings
        {
            get { return Ratings.OfType<Rating>().AsQueryable(); }
        }

        IQueryable<Comment> IRedditModel.Comments
        {
            get { return Comments.OfType<Comment>().AsQueryable(); }
        }

        IQueryable<Post> IRedditModel.Posts
        {
            get { return Posts.OfType<Post>().AsQueryable(); }
        }

        IQueryable<Category> IRedditModel.Categorys
        {
            get { return Categorys.OfType<Category>().AsQueryable(); }
        }

        IQueryable<UseCase> IRedditModel.UseCases
        {
            get { return UseCases.OfType<UseCase>().AsQueryable(); }
        }

        IQueryable<UserGroup> IRedditModel.UserGroups
        {
            get { return UserGroups.OfType<UserGroup>().AsQueryable(); }
        }
    }


    public interface IRedditModel
    {
        IQueryable<User> Users { get; }
        IQueryable<Rating> Ratings { get;  }
        IQueryable<Comment> Comments { get; }
        IQueryable<Post> Posts { get; }
        IQueryable<Category> Categorys { get; }
        IQueryable<UseCase> UseCases { get; }
        IQueryable<UserGroup> UserGroups { get; }
    }
}