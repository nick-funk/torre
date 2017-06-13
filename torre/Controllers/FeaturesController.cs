namespace torre.Controllers
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using AutoMapper;
    using domain.Repositories.Map;
    using Models;

    public class FeaturesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IMarkerRepository markerRepository;

        public FeaturesController(IMapper mapper, IMarkerRepository markerRepository)
        {
            this.mapper = mapper;
            this.markerRepository = markerRepository;
        }

        [HttpGet]
        public ActionResult Index()
        {
            return this.View(new MarkerIndexModel
            {
                Markers = this.mapper.Map<ICollection<MarkerViewModel>>(this.markerRepository.All())
            });
        }
    }
}