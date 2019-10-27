using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
        public IActionResult ShortenLink([FromBody] string url)
        {
            string URL = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(Request);
            Guid guid;
            if (Guid.TryParse(this.HttpContext.Request.Cookies.FirstOrDefault().Value,out guid) && db.Users.Where(x => x.Guid == guid).Any())
            {
                User user = db.Users.Where(x => x.Guid == guid).First();
                Link link = new Link();
                //link.Created
                //user.Links.Add()
                return Ok(URL);
            }
            else
            {
                return BadRequest(guid);
            }
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
                    Content = "<head><meta charset=\"utf-8\"></head>" +
                    "<h1>Твоя ссылка не существует" + Environment.NewLine +
                    "*шепотом*лох</h1>"
                };
            }
        }
        

    }
}