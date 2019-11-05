using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Linker.Models
{
    [Table("Links")]
    public class Link
    {
        
        public DateTime Created { get; set; }
        [Key]
        public long Id { get; set; }
        [Required]
        public string OriginalLink { get; set; }
        public long Redirections { get; set; }

        public long UserId { get; set; }
        public User User { get; set; }
    }
}
