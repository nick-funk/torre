namespace torre.Mappings.Features
{
    using AutoMapper;
    using domain.Models.Map;
    using Models;

    public class MarkerMappingProfile : Profile
    {
        public MarkerMappingProfile()
        {
            this.CreateMap<Marker, MarkerViewModel>();
            this.CreateMap<MarkerAddModel, Marker>()
                .ForMember(dest => dest.Position, opt => opt.ResolveUsing(src => new Point
                {
                    Longitude = src.Longitude,
                    Latitude = src.Latitude
                }));
        }
    }
}