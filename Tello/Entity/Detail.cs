namespace Tello.Entity
{
    public class Detail
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }

        public Card Card { get; set; }

    }
}
