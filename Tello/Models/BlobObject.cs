namespace Tello.Models
{
    public class BlobObject
    {
        //Co zwracamy gdy pobieramy
        public Stream? Content { get; set; }
        public string? ContentType { get; set; }
    }
}
