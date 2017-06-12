namespace torre.Controllers
{
    using System.Web.Mvc;
    using domain.Repositories.Map;

    public class MapController : Controller
    {
        private readonly IMarkerRepository markerRepository;

        public MapController(IMarkerRepository markerRepository)
        {
            this.markerRepository = markerRepository;
        }

        [HttpGet]
        public ActionResult Map()
        {
            return this.PartialView("Map");
        }
    }
}