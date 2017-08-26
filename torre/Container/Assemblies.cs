namespace torre.Container
{
    using System.Reflection;

    public static class Assemblies
    {
        public static Assembly[] GetAll()
        {
            return new[]
            {
                Assembly.Load("torre"),
                Assembly.Load("torre.domain"),
                Assembly.Load("torre.data")
            };
        }
    }
}