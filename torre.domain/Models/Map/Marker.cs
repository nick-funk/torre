namespace torre.domain.Models.Map
{
    using System;

    public class Marker
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public Point Position { get; set; }
    }
}
