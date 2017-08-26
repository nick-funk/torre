namespace torre.Container
{
    using System.Web.Mvc;
    using Autofac;
    using Autofac.Integration.Mvc;
    using AutoMapper;

    public class AutofaqConfig
    {
        public static void ConfigureContainer()
        {
            var builder = new ContainerBuilder();

            builder.RegisterControllers(typeof(MvcApplication).Assembly);
            builder.RegisterFilterProvider();
            builder.RegisterSource(new ViewRegistrationSource());

            builder.RegisterAssemblyTypes(Assemblies.GetAll()).AsSelf().AsImplementedInterfaces();
            builder.RegisterAssemblyModules(Assemblies.GetAll());

            RegisterMappings(builder);

            var container = builder.Build();

            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }

        private static void RegisterMappings(ContainerBuilder builder)
        {
            builder.Register(c => new Mapper(new MapperConfiguration(cfg =>
            {
                cfg.AddProfiles(Assemblies.GetAll());
            }))).As<IMapper>();
        }
    }
}