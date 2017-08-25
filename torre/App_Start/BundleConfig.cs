using System.Web;
using System.Web.Optimization;

namespace torre
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            CreateScriptBundles(bundles);
            CreateStyleBundles(bundles);
        }

        private static void CreateScriptBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr")
                .Include("~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js",
                "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/utilities")
                .IncludeDirectory("~/Scripts/Utilities", "*.js", true));

            bundles.Add(new ScriptBundle("~/bundles/ts")
                .Include("~/Scripts/T4TS.d.js"));

            bundles.Add(new ScriptBundle("~/bundles/mapping")
                .IncludeDirectory("~/Scripts/Maps", "*.js"));

            bundles.Add(new ScriptBundle("~/bundles/UIKit")
                .Include("~/Scripts/UIKit/uikit.js")
                .Include("~/Scripts/UIKit/uikit-icons.js"));

            bundles.Add(new ScriptBundle("~/bundles/viewModels")
                .IncludeDirectory("~/Scripts/ViewModels", "*.js", true));
        }

        private static void CreateStyleBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap.css",
                "~/Content/font-awesome.css",
                "~/Content/card.css",
                "~/Content/site.css",
                "~/Content/layout.css"));

            bundles.Add(new StyleBundle("~/Content/mapping")
                .Include("~/Content/map.css")
                .Include("~/Content/leaflet.css"));

            bundles.Add(new StyleBundle("~/Content/UIKit")
                .Include("~/Content/UIKit/uikit.css")
                .Include("~/Content/UIKit/uikit-customizations.css"));
        }
    }
}
