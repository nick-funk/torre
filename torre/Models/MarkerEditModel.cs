﻿namespace torre.Models
{
    using System;

    public class MarkerEditModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public double Longitude { get; set; }

        public double Latitude { get; set; }
    }
}