namespace torre.data
{
    using System.Data.Entity;
    using Models.Map;

    public class TorreContext : DbContext, ITorreContext
    {
        public TorreContext() : base("torre")
        {
        }

        public IDbSet<Marker> Markers { get; set; }
    }
}
