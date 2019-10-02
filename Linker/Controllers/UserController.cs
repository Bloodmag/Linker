using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Linker.Models;
using System;

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
        public bool SignIn()
        {

        }

    }
}
