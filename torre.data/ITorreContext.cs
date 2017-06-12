namespace torre.data
{
    using System.Data.Entity;
    using Models.Map;

    public interface ITorreContext
    {
        IDbSet<Marker> Markers { get; }

        int SaveChanges();
    }
}