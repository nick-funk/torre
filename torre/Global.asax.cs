namespace torre
{
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;
    using Controllers;
    using data.Repositories.Map;
    using domain.Repositories.Map;
    using LightInject;

    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AutofaqConfig.ConfigureContainer();

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
