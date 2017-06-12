namespace torre.data.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class CreateMarker : DbMigration
    {
        public override void Up()
        {
            this.CreateTable(
                "dbo.Markers",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(),
                        Position = c.Geography(),
                    })
                .PrimaryKey(t => t.Id);
        }
        
        public override void Down()
        {
            this.DropTable("dbo.Markers");
        }
    }
}
