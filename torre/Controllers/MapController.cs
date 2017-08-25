namespace torre.Controllers
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using AutoMapper;
    using domain.Repositories.Map;
    using Models;

    public class MapController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IMarkerRepository _markerRepository;

        public MapController(IMapper mapper, IMarkerRepository markerRepository)
        {
            _mapper = mapper;
            _markerRepository = markerRepository;
        }

        [HttpGet]
        public JsonResult Markers()
        {
            return Json(_mapper.Map<IEnumerable<MarkerViewModel>>(_markerRepository.All()),
                JsonRequestBehavior.AllowGet);
        }
    }
}