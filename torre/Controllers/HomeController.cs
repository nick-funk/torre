using System.Web.Mvc;

namespace torre.Controllers
{
    using System.Collections.Generic;
    using AutoMapper;
    using domain.Repositories.Map;
    using Models;

    public class HomeController : Controller
    {
        private readonly IMarkerRepository markerRepository;
        private readonly IMapper mapper;

        public HomeController(IMarkerRepository markerRepository, IMapper mapper)
        {
            this.markerRepository = markerRepository;
            this.mapper = mapper;
        }

        public ActionResult Index()
        {
            return this.View(new MarkerIndexModel
            {
                Markers = this.mapper.Map<ICollection<MarkerViewModel>>(this.markerRepository.All())
            });
        }

        public ActionResult About()
        {
            return this.View();
        }

        public ActionResult Contact()
        {
            return this.View();
        }
    }
}