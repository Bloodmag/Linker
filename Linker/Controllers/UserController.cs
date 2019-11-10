using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Linker.Models;
using System;
using Microsoft.EntityFrameworkCore;

namespace Linker.Controllers
{
    [Route("api/user")]
    public class UserController : Controller
    {
        private ApplicationContext db;
        public UserController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet]
        public Guid SignUp()
        {
            User user = new User();
            db.Users.Add(user);
            db.SaveChanges();
            return user.Guid;
        }
        [HttpGet("{guid}")]
        public bool SignIn(Guid guid)
        {
            return db.Users.Where(u => u.Guid == guid).Count() > 0;
        }
        [HttpGet("{guid}/links")]
        public IEnumerable<LinkWebData> GetLinks(Guid guid)
        {
            User user = db.Users.Include(u => u.Links).Where(x => x.Guid == guid).First();
            if (user.Links != null)
            {
                return user.Links.Select(l => new LinkWebData() { ShortUrl = LinkController.LongToCode(l.Id), LongUrl = l.OriginalLink,Created=l.Created.ToString(),Redirections = l.Redirections.ToString() });
            }
            
            return null;
        }

    }

    //all paraemeters are strings due to their immutability, simple way to avoid type mismatch errors
    public class LinkWebData
    {
        public string ShortUrl { get; set; }
        public string LongUrl { get; set; }
        public string Created { get; set; }
        public string Redirections { get; set; }
    }
}
