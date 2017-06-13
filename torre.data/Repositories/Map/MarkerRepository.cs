namespace torre.data.Repositories.Map
{
    using System.Collections.Generic;
    using System.Linq;
    using AutoMapper;
    using domain.Models.Map;
    using domain.Repositories.Map;

    public class MarkerRepository : IMarkerRepository
    {
        private readonly ITorreContext context;
        private readonly IMapper mapper;

        public MarkerRepository(ITorreContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public void Add(Marker marker)
        {
            this.context.Markers.Add(this.mapper.Map<Models.Map.Marker>(marker));
            this.context.SaveChanges();
        }

        public void Remove(Marker marker)
        {
            
        }

        public ICollection<Marker> All()
        {
            return this.mapper.Map<ICollection<Marker>>(this.context.Markers.ToList());
        }
    }
}
