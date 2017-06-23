namespace torre.Models
{
    using System;
    using T4TS;

    [TypeScriptInterface]
    public class MarkerViewModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public double Longitude { get; set; }

        public double Latitude { get; set; }
    }
}