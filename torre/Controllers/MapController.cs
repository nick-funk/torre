namespace torre.Controllers
{
    using System.Web.Mvc;

    public class MapController : Controller
    {
        [HttpGet]
        public ActionResult Map()
        {
            return this.PartialView("Map");
        }
    }
}