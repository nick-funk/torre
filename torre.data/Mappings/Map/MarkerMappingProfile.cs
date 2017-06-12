namespace torre.data.Mappings.Map
{
    using AutoMapper;
    using Marker = Models.Map.Marker;

    public class MarkerMappingProfile : Profile
    {
        public MarkerMappingProfile()
        {
            this.CreateMap<Marker, domain.Models.Map.Marker>();
            this.CreateMap<domain.Models.Map.Marker, Marker>();
        }
    }
}
