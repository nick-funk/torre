﻿namespace torre.Models
{
    using System;
    using T4TS;

    [TypeScriptInterface]
    public class MarkerEditModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Content { get; set; }

        public string Icon { get; set; }

        public double Longitude { get; set; }

        public double Latitude { get; set; }
    }
}