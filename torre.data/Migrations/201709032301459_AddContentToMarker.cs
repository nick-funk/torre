namespace torre.data.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class AddContentToMarker : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Markers", "Content", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Markers", "Content");
        }
    }
}
