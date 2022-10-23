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
                values: new object[] { new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa1"), "0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0\n                        0 1 1 0 1 1 1 1 0 1 1 0 1 1 1 1 0 1 1 0\n                        0 1 1 0 1 1 1 1 0 1 1 0 1 1 1 1 0 1 1 0\n                        0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n                        0 1 1 0 1 0 1 1 1 1 1 1 1 1 0 1 0 1 1 0\n                        0 0 0 0 1 0 0 0 0 1 1 0 0 0 0 1 0 0 0 0\n                        1 1 1 0 1 1 1 0 0 1 1 0 0 1 1 1 0 1 1 1\n                        1 1 1 0 1 0 0 0 0 0 0 0 0 0 0 1 0 1 1 1\n                        1 1 1 0 1 0 1 1 1 0 0 1 1 1 0 1 0 1 1 1\n                        0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0\n                        0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0\n                        1 1 1 0 1 0 1 1 1 1 1 1 1 1 0 1 0 1 1 1\n                        1 1 1 0 1 0 0 0 0 0 0 0 0 0 0 1 0 1 1 1\n                        0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0\n                        0 1 1 1 0 0 0 0 0 1 1 0 0 0 0 0 1 1 1 0\n                        0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0\n                        1 1 0 1 0 1 0 1 1 1 1 1 1 0 1 0 1 0 1 1\n                        0 0 0 0 0 1 0 0 0 1 1 0 0 0 1 0 0 0 0 0\n                        0 1 1 1 1 1 1 1 0 1 1 0 1 1 1 1 1 1 1 0\n                        0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0", "Map 1" });

            migrationBuilder.InsertData(
                table: "Map",
                columns: new[] { "Id", "Map", "Name" },
                values: new object[] { new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa2"), "1 1 1 1 1 1 1 1 1 0 0 1 1 1 1 1 1 1 1 1\n                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1\n                        1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1\n                        1 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1\n                        1 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 0 1\n                        1 0 0 1 0 0 1 1 1 1 1 1 1 1 0 0 1 0 0 1\n                        1 0 0 1 0 0 0 0 0 1 1 0 0 0 0 0 1 0 0 1\n                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1\n                        1 1 1 0 1 0 1 1 1 0 0 1 1 1 0 1 0 1 1 1\n                        0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0\n                        0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0\n                        1 1 1 0 1 0 1 1 1 1 1 1 1 1 0 1 0 1 1 1\n                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1\n                        1 0 0 1 0 0 0 0 0 1 1 0 0 0 0 0 1 0 0 1\n                        1 0 0 1 0 0 1 1 1 1 1 1 1 1 0 0 1 0 0 1\n                        1 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 0 1\n                        1 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1\n                        1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1\n                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1\n                        1 1 1 1 1 1 1 1 1 0 0 1 1 1 1 1 1 1 1 1", "Map 2" });

            migrationBuilder.InsertData(
                table: "Map",
                columns: new[] { "Id", "Map", "Name" },
                values: new object[] { new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa3"), "1 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 1\n                        1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1\n                        1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 1 0 1\n                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 1 0 1\n                        1 1 0 1 1 1 1 1 1 0 1 0 1 0 1 0 0 1 0 1\n                        0 0 0 1 0 0 0 1 0 0 1 0 1 0 1 0 0 0 0 0\n                        0 0 1 1 1 1 0 1 0 1 1 0 1 0 1 1 1 1 1 0\n                        0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n                        1 1 1 1 1 0 1 1 1 0 0 1 1 1 0 1 1 1 1 1\n                        1 0 0 0 0 0 1 0 0 0 0 0 0 1 1 1 0 0 0 1\n                        1 1 1 0 1 0 1 0 0 0 0 0 0 1 0 0 0 1 0 1\n                        1 0 0 0 1 0 1 1 1 1 1 1 1 1 0 1 1 1 0 1\n                        0 0 1 1 1 0 0 0 0 1 1 0 0 0 0 0 0 1 0 0\n                        0 1 1 0 1 0 1 1 1 1 1 1 1 1 1 1 0 1 1 0\n                        0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 1 0 0\n                        1 1 1 0 1 0 1 0 1 1 1 1 1 1 1 1 1 1 0 1\n                        1 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1\n                        1 0 1 0 1 0 1 1 1 1 1 1 1 1 1 1 0 1 0 1\n                        1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1\n                        1 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 1", "Map 3" });

            migrationBuilder.InsertData(
                table: "Lobby",
                columns: new[] { "Id", "Level", "MapId", "Name", "Player1", "Player2" },
                values: new object[] { new Guid("0b97d212-e892-406a-929f-6f8f1c2f8162"), 2, new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa2"), "Lobby 2", null, null });

            migrationBuilder.InsertData(
                table: "Lobby",
                columns: new[] { "Id", "Level", "MapId", "Name", "Player1", "Player2" },
                values: new object[] { new Guid("a811ffb6-6b08-441b-b799-362fc9fee43d"), 3, new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa3"), "Lobby 3", null, null });

            migrationBuilder.InsertData(
                table: "Lobby",
                columns: new[] { "Id", "Level", "MapId", "Name", "Player1", "Player2" },
                values: new object[] { new Guid("fe924845-c4dd-4210-a6a3-79087a66c182"), 1, new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa1"), "Lobby 1", null, null });

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
