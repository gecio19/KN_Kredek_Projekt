namespace Tello.Entity
{
    public class Card
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Table Table{ get; set; }

        public List<Detail>? Details { get; set; }


    }
}
