﻿namespace torre.domain.Models.Map
{
    using System;

    public class Marker
    {
        public Marker()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Content { get; set; }

        public string Icon { get; set; }

        public Point Position { get; set; }
    }
}
