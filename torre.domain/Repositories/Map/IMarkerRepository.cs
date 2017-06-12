namespace torre.domain.Repositories.Map
{
    using System.Collections.Generic;
    using Models.Map;

    public interface IMarkerRepository
    {
        void Add(Marker marker);

        void Remove(Marker marker);

        ICollection<Marker> All();
    }
}