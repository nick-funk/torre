namespace torre.data.Mappings.Map
{
    using AutoMapper;
    using Marker = Models.Map.Marker;

    public class MarkerMappingProfile : Profile
    {
        public MarkerMappingProfile()
        {
            CreateMap<Marker, domain.Models.Map.Marker>();
            CreateMap<domain.Models.Map.Marker, Marker>();
        }
    }
}
