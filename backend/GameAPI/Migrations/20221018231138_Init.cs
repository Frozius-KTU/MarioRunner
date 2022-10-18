using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameAPI.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lobby",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Level = table.Column<int>(type: "int", nullable: true),
                    Player1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Player2 = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lobby", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Lobby",
                columns: new[] { "Id", "Level", "Name", "Player1", "Player2" },
                values: new object[] { new Guid("141abfc7-3d12-470c-9d18-2b4630a24e6c"), 3, "Lobby 3", null, null });

            migrationBuilder.InsertData(
                table: "Lobby",
                columns: new[] { "Id", "Level", "Name", "Player1", "Player2" },
                values: new object[] { new Guid("5403116f-4df7-4179-a2d2-23a3f73a6d92"), 1, "Lobby 1", null, null });

            migrationBuilder.InsertData(
                table: "Lobby",
                columns: new[] { "Id", "Level", "Name", "Player1", "Player2" },
                values: new object[] { new Guid("7fe7e573-2510-43e8-a6da-a9afbaa68e32"), 2, "Lobby 2", null, null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Lobby");
        }
    }
}
