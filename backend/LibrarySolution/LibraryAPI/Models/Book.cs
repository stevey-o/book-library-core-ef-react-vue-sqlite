using System.ComponentModel.DataAnnotations;

namespace LibraryAPI.Models
{
    public class Book
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(300)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string Author { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Genre { get; set; }

        public DateTime PublishedDate { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }
    }
}

