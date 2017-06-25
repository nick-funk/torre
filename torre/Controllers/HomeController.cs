namespace torre.Controllers
{
    using System.Web.Mvc;
    using Models;

    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return this.View(new MapViewModel
            {
                Center = new Coordinate
                {
                    Latitude = 51.053952,
                    Longitude = -114.070596
                },
                Zoom = 15
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