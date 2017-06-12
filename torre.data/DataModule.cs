namespace torre.data
{
    using Autofac;
    using domain.Repositories.Map;
    using Repositories.Map;

    public class DataModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.Register(c => new TorreContext()).As<ITorreContext>().InstancePerRequest();

            builder.RegisterType<MarkerRepository>().As<IMarkerRepository>().InstancePerRequest();
        }
    }
}