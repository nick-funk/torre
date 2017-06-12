namespace torre
{
    using System.Web.Mvc;
    using Autofac;
    using Autofac.Integration.Mvc;
    using AutoMapper;
    using data;
    using data.Mappings.Map;

    public class AutofaqConfig
    {
        public static void ConfigureContainer()
        {
            var builder = new ContainerBuilder();

            builder.RegisterControllers(typeof(MvcApplication).Assembly);
            builder.RegisterFilterProvider();
            builder.RegisterSource(new ViewRegistrationSource());

            RegisterMappings(builder);

            RegisterModules(builder);

            var container = builder.Build();

            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }

        private static void RegisterMappings(ContainerBuilder builder)
        {
            Mapper mapper = new Mapper(new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<GeographyMappingProfile>();
                cfg.AddProfile<MarkerMappingProfile>();
            }));

            builder.Register(c => mapper).As<IMapper>();
        }

        private static void RegisterModules(ContainerBuilder builder)
        {
            builder.RegisterModule(new DataModule());
        }
    }
}