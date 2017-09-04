namespace torre.data.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class AddIconToMarker : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Markers", "Icon", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Markers", "Icon");
        }
    }
}
