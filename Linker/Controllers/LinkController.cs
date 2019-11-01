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
        static char[] dict;
        const long mask = 0b0000000000000000000000010101100011000100001001110100010010101011;
        //lim ->        =                         110011001111110000100101100110111110000000
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
                User user = db.Users.Where(x => x.Guid == guid).First();
                Link link = new Link();
                
                
                //link.Created
                //user.Links.Add()
                return Ok(Json("http://google.com"));
            }
            else
            {
                return BadRequest(guid);
            }
        }

        [HttpGet("{shortLink}")]
        public IActionResult RedirectLink(string shortLink)
        {
            return new RedirectResult("http://" + shortLink);
            return new ContentResult
            {
                ContentType = "text/html",
                Content = "<head><meta http-equiv=\"Refresh\" content=\"0; url=http://" + shortLink + "\" /></head>"
            };
            if (shortLink.Length == 7 && db.Links.Where(l => l.Shortlink == shortLink).Any())
            {
                Response.Redirect(shortLink);
                return new ContentResult{
                    ContentType = "text/html",
                    Content = "<!DOCTYPE html>< html >< head > < meta http - equiv = \"Refresh\" content = \"url="+ shortLink + "\" /></ head ></ html > "
                };
            }
            else
            {
                return new ContentResult
                {
                    ContentType = "text/html",
                    Content = "<head><meta charset=\"utf-8\"></head>" +
                    "<h1>Твоя ссылка не существует<br>" +
                    "*шепотом*лох</h1>"
                };
            } 
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

        private static long? CodeToLong(string code)
        {
            if (code.Length != 7) return null;
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
            return num;
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