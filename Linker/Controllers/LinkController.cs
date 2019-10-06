using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Linker.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Linker.Controllers
{
    [Route("l")]
    public class LinkController : Controller
    {
        private ApplicationContext db;
        public LinkController(ApplicationContext context)
        {
            db = context;
        }
        [HttpPost("shorten")]
        public string ShortenLink([FromBody] Guid guid, [FromBody] string url)
        {
            User user = db.Users.Find(guid);
            Link link = new Link();
            //link.Created
            //user.Links.Add()
            return "SOSIhui";
        }

        [HttpGet("{shortLink}")]
        public ContentResult Redirect(string shortLink)
        {
            if (shortLink.Length == 7 && db.Links.Where(l => l.Shortlink == shortLink).Count() > 0)
            {
                return new ContentResult
                {
                    ContentType = "text/html",
                    Content = "<div>Hello World" + shortLink + "</div>"
                };
            }
            else
            {
                return new ContentResult
                {
                    ContentType = "text/html",
                    Content = "<h1>Твоя ссылка нне существует/n " +
                    "*шепотом*лох</h1>"
                };
            }
        }
        

    }
}