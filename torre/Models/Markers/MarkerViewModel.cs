namespace torre.Models.Markers
{
    using System;

    public class MarkerViewModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public double Longitude { get; set; }

        public double Latitude { get; set; }
    }
}