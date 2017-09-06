namespace torre.domain.Repositories.Map
{
    using System;
    using System.Collections.Generic;
    using Models.Map;

    public interface IMarkerRepository
    {
        void Add(Marker marker);

        void Remove(Guid id);

        Marker Get(Guid id);

        void Update(Marker marker);

        ICollection<Marker> All();

        ICollection<Marker> All(Bounds bounding);
    }
}