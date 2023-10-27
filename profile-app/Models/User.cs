using System;
using System.ComponentModel.DataAnnotations;

namespace profile_app.Models
{
    public class User
    {
        [Key]
        public Guid userid { get; set; }

        public string namalengkap { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string status { get; set; }
    }
}
