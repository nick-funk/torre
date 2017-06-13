namespace torre.Controllers
{
    using System.Web.Mvc;
    using AutoMapper;
    using domain.Models.Map;
    using domain.Repositories.Map;
    using Models;

    public class MarkerController : Controller
    {
        private readonly IMarkerRepository markerRepository;
        private readonly IMapper mapper;

        public MarkerController(IMarkerRepository markerRepository, IMapper mapper)
        {
            this.markerRepository = markerRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public ActionResult Add()
        {
            return this.View(new MarkerAddModel());
        }

        [HttpPost]
        public ActionResult Add(MarkerAddModel model)
        {
            if (this.ModelState.IsValid)
            {
                this.markerRepository.Add(this.mapper.Map<Marker>(model));

                return this.RedirectToAction("Index", "Features");
            }

            return this.View(model);
        }
    }
}