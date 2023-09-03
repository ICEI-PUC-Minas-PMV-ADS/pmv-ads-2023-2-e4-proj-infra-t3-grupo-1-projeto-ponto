using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Models
{
	public class ApplicationUser 
	{
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string FullName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}

