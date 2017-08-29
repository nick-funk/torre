namespace torre.Areas.Api.Controllers
{
    using System;
    using System.Net;
    using System.Web.Mvc;
    using domain.Models.Map;
    using domain.Repositories.Map;

    public class MarkerController : Controller
    {
        private readonly IMarkerRepository _markerRepository;

        public MarkerController(IMarkerRepository markerRepository)
        {
            _markerRepository = markerRepository;
        }

        [HttpPost]
        public ActionResult Add(Guid id, string name, double latitude, double longitude)
        {
            var marker = new Marker
            {
                Id = id,
                Name = name,
                Position = new Point { Latitude = latitude, Longitude = longitude }
            };

            _markerRepository.Add(marker);

            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        [HttpPost]
        public ActionResult Remove(Guid id)
        {
            _markerRepository.Remove(id);

            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
    }
}