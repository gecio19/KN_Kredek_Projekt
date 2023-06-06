namespace Tello.Entity
{
    public class Table
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Theme { get; set; }
        public User User { get; set; }
        public List<Card>? Cards { get; set; }



    }
}
