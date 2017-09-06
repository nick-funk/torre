namespace torre.domain.Models.Map
{
    public class Bounds
    {
        public Bounds(Point northWest, Point southEast)
        {
            NorthWest = northWest;
            SouthEast = southEast;
        }

        public Point NorthWest { get; }

        public Point SouthEast { get; }
    }
}