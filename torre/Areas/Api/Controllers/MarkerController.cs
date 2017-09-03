namespace torre.Areas.Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Web.Mvc;
    using AutoMapper;
    using domain.Models.Map;
    using domain.Repositories.Map;
    using Models;

    public class MarkerController : Controller
    {
        private readonly IMarkerRepository _markerRepository;
        private readonly IMapper _mapper;

        public MarkerController(IMarkerRepository markerRepository, IMapper mapper)
        {
            _markerRepository = markerRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public JsonResult Get(Guid id)
        {
            var marker = _markerRepository.Get(id);

            return Json(_mapper.Map<MarkerModel>(marker), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult All()
        {
            return Json(_mapper.Map<IEnumerable<MarkerModel>>(_markerRepository.All()), JsonRequestBehavior.AllowGet);
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

        [HttpPost]
        public ActionResult Update(Guid id, string name, string content)
        {
            var marker = _markerRepository.Get(id);

            marker.Name = name;
            marker.Content = content;

            _markerRepository.Update(marker);

            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
    }
}