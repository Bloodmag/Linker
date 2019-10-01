using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Linker.Models
{
    public class User
    {
        [Key]
        public long Id { get; set; }
        [Required]
        public Guid Guid { get; set; }

        public List<Link> Links { get; set; }
    }
}
