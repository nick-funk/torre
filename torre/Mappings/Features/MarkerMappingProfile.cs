namespace torre.Mappings.Features
{
    using AutoMapper;
    using domain.Models.Map;
    using Models;

    public class MarkerMappingProfile : Profile
    {
        public MarkerMappingProfile()
        {
            this.CreateMap<Marker, MarkerViewModel>()
                .ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.Position.Longitude))
                .ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.Position.Latitude));

            this.CreateMap<MarkerAddModel, Marker>()
                .ForMember(dest => dest.Position, opt => opt.ResolveUsing(src => new Point
                {
                    Longitude = src.Longitude,
                    Latitude = src.Latitude
                }));
        }
    }
}