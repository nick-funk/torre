using System.Web;

namespace torre.Controllers
{
    using System;
    using System.Web.Mvc;
    using AutoMapper;
    using domain.Models.Map;
    using domain.Repositories.Map;
    using Models;
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
        public ActionResult Add()
        {
            return View(new MarkerAddModel());
        }

        [HttpPost]
        public ActionResult Add(MarkerAddModel model)
        {
            if (ModelState.IsValid)
            {
                _markerRepository.Add(_mapper.Map<Marker>(model));

                return RedirectToAction("Index", "Features");
            }

            return View(model);
        }

        [HttpGet]
        public ActionResult Edit(Guid id)
        {
            var model = _markerRepository.Get(id);

            return View(_mapper.Map<MarkerEditModel>(model));
        }

        [HttpPost]
        public ActionResult Edit(MarkerEditModel model)
        {
            if (ModelState.IsValid)
            {
                _markerRepository.Update(_mapper.Map<Marker>(model));

                return RedirectToAction("Index", "Features");
            }

            return View(model);
        }
    }
}