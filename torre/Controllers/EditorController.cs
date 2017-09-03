namespace torre.Controllers
{
    using System.Web.Mvc;
    using Models.Editor;

    public class EditorController : Controller
    {
        [HttpGet, ChildActionOnly]
        public ActionResult Index()
        {
            return PartialView(new EditorIndexModel());
        }

        [HttpGet, ChildActionOnly]
        public ActionResult Properties()
        {
            return PartialView("Properties");
        }
    }
}