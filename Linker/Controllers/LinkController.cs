using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Linker.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Linker.Controllers
{
    [Route("l")]
    public class LinkController : Controller
    {
        private ApplicationContext db;
        static readonly char[] dict;
        const long mask = 0b0000000000000000000000010101100011000100001001110100010010101011;
        //lim ->        =                         110011001111110000100101100110111110000000
        static LinkController()
        {
            dict = new char[62];
            for (int i = 0; i < 10; i++)
                dict[i] = (char)('0' + i);
            for (int i = 0; i < 26; i++)
                dict[i + 10] = (char)('A' + i);
            for (int i = 0; i < 26; i++)
                dict[i + 36] = (char)('a' + i);
        }
        public LinkController(ApplicationContext context)
        {
            db = context;
        }
        [HttpPost("shorten")]
        public IActionResult ShortenLink([FromBody] string longUrl)
        {
            string URL = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(Request);
            
            Guid guid;
            if (Guid.TryParse(this.HttpContext.Request.Cookies.FirstOrDefault().Value,out guid) && db.Users.Where(x => x.Guid == guid).Any())
            {
                if (!Regex.Match(longUrl,  @"^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&%'\(\) \*\+,;=.]+$").Success)
                    return BadRequest(longUrl);

                User user = db.Users.Include(u => u.Links).Where(x => x.Guid == guid).First();
                if(user.Links!= null && user.Links.Where(l => l.OriginalLink == longUrl).Any())
                {
                    return Ok(Json(LongToCode(user.Links.Where(l => l.OriginalLink == longUrl).First().Id)));
                }
                Link link = new Link() { User = user,OriginalLink = longUrl, Created = DateTime.Now};
                db.Links.Add(link);
                db.SaveChanges();

                if (link.Id >= 3521614606208)
                {
                    db.Links.Remove(link);
                    return BadRequest("Service is no longer available =(");
                }

                return Ok(Json(LongToCode(link.Id)));
            }
            else
            {
                return BadRequest(guid);
            }
        }

        [HttpGet("{shortLink}")]
        public IActionResult RedirectLink(string shortLink)
        {
            long? id = CodeToLong(shortLink);
            if (id == null)
                return new ContentResult
                {
                    ContentType = "text/html",
                    Content = "<head><meta charset=\"utf-8\"></head>" +
                    "<h1>Твоя ссылка не существует<br>" +
                    "*шепотом*лох</h1>"
                };
            else
            {
                var l = db.Links.Find(id.Value);
                if (l != null)
                {
                    l.Redirections++;
                    db.SaveChanges();
                    return new RedirectResult((l.OriginalLink.StartsWith("http://") || l.OriginalLink.StartsWith("https://")) ? l.OriginalLink : "http://" +l.OriginalLink );
                }
            }
            return new RedirectResult("http://" + shortLink);
        }

        private static long Pow(long x, long y)
        {
            long ans = 1;
            for (int i = 0; i < y; i++)
            {
                ans *= x;
            }
            return ans;
        }

        public static string LongToCode(long num)
        {
            if (num < 0 || num > 3521614606207)
                return null;
            string ans = "";
            num = ((num ^ mask) < 3521614606208) ? (num ^ mask) : num;
            for (int i = 6; i >= 0; i--)
            {
                if (num >= Pow(62, i))
                {
                    ans += dict[num / Pow(62, i)];
                }
                else
                    ans += '0';
                num %= Pow(62, i);
            }
            return ans;
        }

        public static long? CodeToLong(string code)
        {
            if (code == null || code.Length != 7) return null;
            long num = 0;
            for (int i = 0; i < 7; i++)
            {
                if (code[i] >= '0' && code[i] <= '9')
                {
                    num += (code[i] - '0') * Pow(62, 6 - i);
                }
                else if (code[i] >= 'A' && code[i] <= 'Z')
                {
                    num += (code[i] - 'A' + 10) * Pow(62, 6 - i);
                }
                else if (code[i] >= 'a' && code[i] <= 'z')
                {
                    num += (code[i] - 'a' + 36) * Pow(62, 6 - i);
                }
                else return null;
            }
            //3521614606208
            return ((num ^ mask) < 3521614606208) ? (num ^ mask) : num; 
        }

    }
}

/*
 * static char[] dict;
        const long mask = 0b0000000000000000000000010101100011000100001001110100010010101011;
        static Program()
        {
            dict = new char[62];
            for (int i = 0; i < 10; i++)
                dict[i] = (char)('0' + i);
            for (int i = 0; i < 26; i++)
                dict[i+10] = (char)('A' + i);
            for (int i = 0; i < 26; i++)
                dict[i + 36] = (char)('a' + i);
        }
        private static long Pow(long x, long y)
        {
            long ans = 1;
            for (int i = 0; i < y; i++)
            {
                ans *= x;
            }
            return ans;
        }

        private static string LongToCode(long num)
        {
            if (num < 0 || num > 3521614606207)
                return null;
            string ans = "";
            num ^= mask;
            for(int i = 6; i >= 0; i--)
            {
                if (num >= Pow(62, i))
                {
                    ans += dict[num / Pow(62, i)];
                }
                else
                    ans += '0';
                num %= Pow(62, i);
            }
            return ans;
        }


        private static long? CodeToLong(string code)
        {
            if (code==null || code.Length != 7) return null;
            long num = 0;
            for (int i = 0; i < 7; i++)
            {
                if (code[i] >= '0' && code[i] <= '9')
                {
                    num += (code[i] - '0')*Pow(62, 6 - i);
                }
                else if (code[i] >= 'A' && code[i] <= 'Z')
                {
                    num += (code[i] - 'A' + 10) *Pow(62, 6 - i);
                }
                else if (code[i] >= 'a' && code[i] <= 'z')
                {
                    num += (code[i] - 'a' + 36)*Pow(62, 6 - i);
                }
                else return null;
            }
            return num^mask;
        }
*/