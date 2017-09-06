namespace torre.Controllers
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using AutoMapper;
    using domain.Repositories.Map;
    using Models;
    using Models.Markers;

    public class FeaturesController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IMarkerRepository _markerRepository;

        public FeaturesController(IMapper mapper, IMarkerRepository markerRepository)
        {
            _mapper = mapper;
            _markerRepository = markerRepository;
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View(new MarkerIndexModel
            {
                Markers = _mapper.Map<ICollection<MarkerViewModel>>(_markerRepository.All())
            });
        }
    }
}