namespace torre.data.Mappings.Map
{
    using System.Data.Entity.Spatial;
    using AutoMapper;
    using domain.Models.Map;

    public class GeographyMappingProfile : Profile
    {
        public GeographyMappingProfile()
        {
            CreateMap<DbGeography, Point>()
                .ConstructUsing(src => new Point
                {
                    Longitude = src.Longitude ?? 0,
                    Latitude = src.Latitude ?? 0
                });

            CreateMap<Point, DbGeography>()
                .ConstructUsing(src => DbGeography.PointFromText($"POINT({src.Longitude} {src.Latitude})", 4326));
        }
    }
}