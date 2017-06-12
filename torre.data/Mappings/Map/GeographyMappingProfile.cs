namespace torre.data.Mappings.Map
{
    using System.Data.Entity.Spatial;
    using AutoMapper;
    using domain.Models.Map;

    public class GeographyMappingProfile : Profile
    {
        public GeographyMappingProfile()
        {
            this.CreateMap<DbGeography, Point>()
                .ConstructUsing(src => new Point
                {
                    X = src.Longitude ?? 0,
                    Y = src.Latitude ?? 0
                });
        }
    }
}