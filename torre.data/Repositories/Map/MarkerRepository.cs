namespace torre.data.Repositories.Map
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Spatial;
    using System.Linq;
    using AutoMapper;
    using domain.Models.Map;
    using domain.Repositories.Map;

    public class MarkerRepository : IMarkerRepository
    {
        private readonly ITorreContext _context;
        private readonly IMapper _mapper;

        public MarkerRepository(ITorreContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void Add(Marker marker)
        {
            _context.Markers.Add(_mapper.Map<Models.Map.Marker>(marker));
            _context.SaveChanges();
        }

        public void Remove(Guid id)
        {
            var entity = _context.Markers.Single(m => m.Id == id);
            _context.Markers.Remove(entity);

            _context.SaveChanges();
        }

        public Marker Get(Guid id)
        {
            return _mapper.Map<Marker>(_context.Markers.Single(m => m.Id == id));
        }

        public void Update(Marker marker)
        {
            var entity = _context.Markers.Single(m => m.Id == marker.Id);

            _mapper.Map(marker, entity);
            entity.Position = _mapper.Map<DbGeography>(marker.Position);

            _context.SaveChanges();
        }

        public ICollection<Marker> All()
        {
            return _mapper.Map<ICollection<Marker>>(_context.Markers.ToList());
        }
    }
}
