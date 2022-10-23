﻿// <auto-generated />
using System;
using GameAPI.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GameAPI.Migrations
{
    [DbContext(typeof(GameContext))]
    partial class GameContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("GameAPI.Model.LobbyModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<int?>("Level")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<Guid?>("MapId")
                        .IsRequired()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("Player1")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("Player2")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("MapId");

                    b.ToTable("Lobby", (string)null);

                    b.HasData(
                        new
                        {
                            Id = new Guid("fe924845-c4dd-4210-a6a3-79087a66c182"),
                            Level = 1,
                            MapId = new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa1"),
                            Name = "Lobby 1"
                        },
                        new
                        {
                            Id = new Guid("0b97d212-e892-406a-929f-6f8f1c2f8162"),
                            Level = 2,
                            MapId = new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa2"),
                            Name = "Lobby 2"
                        },
                        new
                        {
                            Id = new Guid("a811ffb6-6b08-441b-b799-362fc9fee43d"),
                            Level = 3,
                            MapId = new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa3"),
                            Name = "Lobby 3"
                        });
                });

            modelBuilder.Entity("GameAPI.Model.MapModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<string>("Map")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Map", (string)null);

                    b.HasData(
                        new
                        {
                            Id = new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa1"),
                            Map = "0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0\n                        0 1 1 0 1 1 1 1 0 1 1 0 1 1 1 1 0 1 1 0\n                        0 1 1 0 1 1 1 1 0 1 1 0 1 1 1 1 0 1 1 0\n                        0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n                        0 1 1 0 1 0 1 1 1 1 1 1 1 1 0 1 0 1 1 0\n                        0 0 0 0 1 0 0 0 0 1 1 0 0 0 0 1 0 0 0 0\n                        1 1 1 0 1 1 1 0 0 1 1 0 0 1 1 1 0 1 1 1\n                        1 1 1 0 1 0 0 0 0 0 0 0 0 0 0 1 0 1 1 1\n                        1 1 1 0 1 0 1 1 1 0 0 1 1 1 0 1 0 1 1 1\n                        0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0\n                        0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0\n                        1 1 1 0 1 0 1 1 1 1 1 1 1 1 0 1 0 1 1 1\n                        1 1 1 0 1 0 0 0 0 0 0 0 0 0 0 1 0 1 1 1\n                        0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0\n                        0 1 1 1 0 0 0 0 0 1 1 0 0 0 0 0 1 1 1 0\n                        0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0\n                        1 1 0 1 0 1 0 1 1 1 1 1 1 0 1 0 1 0 1 1\n                        0 0 0 0 0 1 0 0 0 1 1 0 0 0 1 0 0 0 0 0\n                        0 1 1 1 1 1 1 1 0 1 1 0 1 1 1 1 1 1 1 0\n                        0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
                            Name = "Map 1"
                        },
                        new
                        {
                            Id = new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa2"),
                            Map = "1 1 1 1 1 1 1 1 1 0 0 1 1 1 1 1 1 1 1 1\n                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1\n                        1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1\n                        1 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1\n                        1 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 0 1\n                        1 0 0 1 0 0 1 1 1 1 1 1 1 1 0 0 1 0 0 1\n                        1 0 0 1 0 0 0 0 0 1 1 0 0 0 0 0 1 0 0 1\n                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1\n                        1 1 1 0 1 0 1 1 1 0 0 1 1 1 0 1 0 1 1 1\n                        0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0\n                        0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0\n                        1 1 1 0 1 0 1 1 1 1 1 1 1 1 0 1 0 1 1 1\n                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1\n                        1 0 0 1 0 0 0 0 0 1 1 0 0 0 0 0 1 0 0 1\n                        1 0 0 1 0 0 1 1 1 1 1 1 1 1 0 0 1 0 0 1\n                        1 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 0 1\n                        1 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1\n                        1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1\n                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1\n                        1 1 1 1 1 1 1 1 1 0 0 1 1 1 1 1 1 1 1 1",
                            Name = "Map 2"
                        },
                        new
                        {
                            Id = new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa3"),
                            Map = "1 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 1\n                        1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1\n                        1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 1 0 1\n                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 1 0 1\n                        1 1 0 1 1 1 1 1 1 0 1 0 1 0 1 0 0 1 0 1\n                        0 0 0 1 0 0 0 1 0 0 1 0 1 0 1 0 0 0 0 0\n                        0 0 1 1 1 1 0 1 0 1 1 0 1 0 1 1 1 1 1 0\n                        0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n                        1 1 1 1 1 0 1 1 1 0 0 1 1 1 0 1 1 1 1 1\n                        1 0 0 0 0 0 1 0 0 0 0 0 0 1 1 1 0 0 0 1\n                        1 1 1 0 1 0 1 0 0 0 0 0 0 1 0 0 0 1 0 1\n                        1 0 0 0 1 0 1 1 1 1 1 1 1 1 0 1 1 1 0 1\n                        0 0 1 1 1 0 0 0 0 1 1 0 0 0 0 0 0 1 0 0\n                        0 1 1 0 1 0 1 1 1 1 1 1 1 1 1 1 0 1 1 0\n                        0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 1 0 0\n                        1 1 1 0 1 0 1 0 1 1 1 1 1 1 1 1 1 1 0 1\n                        1 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1\n                        1 0 1 0 1 0 1 1 1 1 1 1 1 1 1 1 0 1 0 1\n                        1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1\n                        1 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 1",
                            Name = "Map 3"
                        });
                });

            modelBuilder.Entity("GameAPI.Model.LobbyModel", b =>
                {
                    b.HasOne("GameAPI.Model.MapModel", "Map")
                        .WithMany()
                        .HasForeignKey("MapId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Map");
                });
#pragma warning restore 612, 618
        }
    }
}
