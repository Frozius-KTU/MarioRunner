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
                name: "Map",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Map = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Map", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Lobby",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    MapId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Player1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Player2 = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lobby", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lobby_Map_MapId",
                        column: x => x.MapId,
                        principalTable: "Map",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Map",
                columns: new[] { "Id", "Map", "Name" },
                values: new object[] { new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa1"), "0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0\n                        0 1 1 0 1 1 1 1 0 1 1 0 1 1 1 1 0 1 1 0\n                        0 1 1 0 1 1 1 1 0 1 1 0 1 1 1 1 0 1 1 0\n                        0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n                        0 1 1 0 1 0 1 1 1 1 1 1 1 1 0 1 0 1 1 0\n                        0 0 0 0 1 0 0 0 0 1 1 0 0 0 0 1 0 0 0 0\n                        1 1 1 0 1 1 1 0 0 1 1 0 0 1 1 1 0 1 1 1\n                        1 1 1 0 1 0 0 0 0 0 0 0 0 0 0 1 0 1 1 1\n                        1 1 1 0 1 0 1 1 1 2 2 1 1 1 0 1 0 1 1 1\n                        0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0\n                        0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0\n                        1 1 1 0 1 0 1 1 1 1 1 1 1 1 0 1 0 1 1 1\n                        1 1 1 0 1 0 0 0 0 0 0 0 0 0 0 1 0 1 1 1\n                        0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0\n                        0 1 1 1 0 0 0 0 0 1 1 0 0 0 0 0 1 1 1 0\n                        0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0\n                        1 1 0 1 0 1 0 1 1 1 1 1 1 0 1 0 1 0 1 1\n                        0 0 0 0 0 1 0 0 0 1 1 0 0 0 1 0 0 0 0 0\n                        0 1 1 1 1 1 1 1 0 1 1 0 1 1 1 1 1 1 1 0\n                        0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0", "Map 1" });

            migrationBuilder.InsertData(
                table: "Map",
                columns: new[] { "Id", "Map", "Name" },
                values: new object[] { new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa2"), "1 1 1 1 1 1 1 1 1 0 0 1 1 1 1 1 1 1 1 1\n                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1\n                        1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1\n                        1 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1\n                        1 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 0 1\n                        1 0 0 1 0 0 1 1 1 1 1 1 1 1 0 0 1 0 0 1\n                        1 0 0 1 0 0 0 0 0 1 1 0 0 0 0 0 1 0 0 1\n                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1\n                        1 1 1 0 1 0 1 1 1 2 2 1 1 1 0 1 0 1 1 1\n                        0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0\n                        0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0\n                        1 1 1 0 1 0 1 1 1 1 1 1 1 1 0 1 0 1 1 1\n                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1\n                        1 0 0 1 0 0 0 0 0 1 1 0 0 0 0 0 1 0 0 1\n                        1 0 0 1 0 0 1 1 1 1 1 1 1 1 0 0 1 0 0 1\n                        1 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 0 1\n                        1 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1\n                        1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1\n                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1\n                        1 1 1 1 1 1 1 1 1 0 0 1 1 1 1 1 1 1 1 1", "Map 2" });

            migrationBuilder.InsertData(
                table: "Map",
                columns: new[] { "Id", "Map", "Name" },
                values: new object[] { new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa3"), "1 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 1\n                        1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1\n                        1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 1 0 1\n                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 1 0 1\n                        1 1 0 1 1 1 1 1 1 0 1 0 1 0 1 0 0 1 0 1\n                        0 0 0 1 0 0 0 1 0 0 1 0 1 0 1 0 0 0 0 0\n                        0 0 1 1 1 1 0 1 0 1 1 0 1 0 1 1 1 1 1 0\n                        0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n                        1 1 1 1 1 0 1 1 1 2 2 1 1 1 0 1 1 1 1 1\n                        1 0 0 0 0 0 1 0 0 0 0 0 0 1 1 1 0 0 0 1\n                        1 1 1 0 1 0 1 0 0 0 0 0 0 1 0 0 0 1 0 1\n                        1 0 0 0 1 0 1 1 1 1 1 1 1 1 0 1 1 1 0 1\n                        0 0 1 1 1 0 0 0 0 1 1 0 0 0 0 0 0 1 0 0\n                        0 1 1 0 1 0 1 1 1 1 1 1 1 1 1 1 0 1 1 0\n                        0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 1 0 0\n                        1 1 1 0 1 0 1 0 1 1 1 1 1 1 1 1 1 1 0 1\n                        1 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1\n                        1 0 1 0 1 0 1 1 1 1 1 1 1 1 1 1 0 1 0 1\n                        1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1\n                        1 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 1", "Map 3" });

            migrationBuilder.InsertData(
                table: "Lobby",
                columns: new[] { "Id", "Level", "MapId", "Name", "Player1", "Player2" },
                values: new object[] { new Guid("256b0b17-04a8-49e8-9aa0-de10b824502a"), 2, new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa2"), "Lobby 2", null, null });

            migrationBuilder.InsertData(
                table: "Lobby",
                columns: new[] { "Id", "Level", "MapId", "Name", "Player1", "Player2" },
                values: new object[] { new Guid("64ce0fed-f6be-441f-922d-a1b92cd08ecd"), 3, new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa3"), "Lobby 3", null, null });

            migrationBuilder.InsertData(
                table: "Lobby",
                columns: new[] { "Id", "Level", "MapId", "Name", "Player1", "Player2" },
                values: new object[] { new Guid("a57bac61-52d5-4eaf-b80f-42560d8a6f2d"), 1, new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa1"), "Lobby 1", null, null });

            migrationBuilder.CreateIndex(
                name: "IX_Lobby_MapId",
                table: "Lobby",
                column: "MapId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Lobby");

            migrationBuilder.DropTable(
                name: "Map");
        }
    }
}
