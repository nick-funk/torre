namespace torre.data.Models.Map
{
    using System;
    using System.Data.Entity.Spatial;

    public class Marker
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Content { get; set; }

        public DbGeography Position { get; set; }
    }
}