namespace torre.Mappings
{
    using Areas.Api.Models;
    using AutoMapper;
    using domain.Models.Map;
    using Models;

    public class MarkerMappingProfile : Profile
    {
        public MarkerMappingProfile()
        {
            CreateMap<Marker, MarkerViewModel>()
                .ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.Position.Longitude))
                .ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.Position.Latitude));

            CreateMap<Marker, MarkerEditModel>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.Position.Longitude))
                .ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.Position.Latitude));

            CreateMap<MarkerAddModel, Marker>()
                .ForMember(dest => dest.Position, opt => opt.ResolveUsing(src => new Point
                {
                    Longitude = src.Longitude,
                    Latitude = src.Latitude
                }));

            CreateMap<MarkerEditModel, Marker>()
                .ForMember(dest => dest.Position, opt => opt.ResolveUsing(src => new Point
                {
                    Longitude = src.Longitude,
                    Latitude = src.Latitude
                }));

            CreateMap<Marker, MarkerModel>()
                .ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.Position.Longitude))
                .ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.Position.Latitude)); ;
        }
    }
}