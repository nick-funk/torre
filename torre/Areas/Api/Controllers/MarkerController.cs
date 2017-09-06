namespace torre.Areas.Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Web.Mvc;
    using AutoMapper;
    using domain.Models.Map;
    using domain.Repositories.Map;
    using Models.Markers;

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
        public JsonResult Edit(Guid id)
        {
            var marker = _markerRepository.Get(id);

            return Json(_mapper.Map<MarkerEditModel>(marker), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult All(double nwLongitude, double nwLatitude, double seLongitude, double seLatitude)
        {
            return Json(_mapper.Map<IEnumerable<MarkerModel>>(
                _markerRepository.All(
                        new Point
                        {
                            Latitude = nwLatitude,
                            Longitude = nwLongitude
                        }, 
                        new Point
                        {
                            Latitude = seLatitude,
                            Longitude = seLongitude
                        })
                    ), JsonRequestBehavior.AllowGet);
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
        public JsonResult Update(Guid id, string name, string content)
        {
            var marker = _markerRepository.Get(id);

            marker.Name = name;
            marker.Content = content;

            _markerRepository.Update(marker);

            return Json(_mapper.Map<MarkerModel>(marker));
        }
    }
}