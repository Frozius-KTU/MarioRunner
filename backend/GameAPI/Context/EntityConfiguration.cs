﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using GameAPI.Model;

namespace GameAPI.Context
{
    public class LobbyEntityConfiguration : BaseEntityConfiguration<LobbyModel>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<LobbyModel> builder)
        {
            builder.ToTable("Lobby");

            builder.Property(x => x.Name).IsRequired();
            builder.Property(x => x.Level).IsRequired();
            builder.HasOne(x => x.Map)
                .WithMany()
                .HasForeignKey(x => x.MapId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(x => x.Player1);
            builder.Property(x => x.Player2);

            builder.HasData(
                new LobbyModel { Id = Guid.NewGuid(), Name = "Lobby 1", Level = 1, MapId = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa1") },
                new LobbyModel { Id = Guid.NewGuid(), Name = "Lobby 2", Level = 2, MapId = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa2") },
                new LobbyModel { Id = Guid.NewGuid(), Name = "Lobby 3", Level = 3, MapId = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa3") }
                );
        }
    }

    public class MapEntityConfiguration : BaseEntityConfiguration<MapModel>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<MapModel> builder)
        {
            builder.ToTable("Map");

            builder.Property(x => x.Name);
            builder.Property(x => x.Map);

            builder.HasData(
                new MapModel { Id = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa1"), Name = "Map 1", 
                Map = @"0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0
                        0 1 1 0 1 1 1 1 0 1 1 0 1 1 1 1 0 1 1 0
                        0 1 1 0 1 1 1 1 0 1 1 0 1 1 1 1 0 1 1 0
                        0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
                        0 1 1 0 1 0 1 1 1 1 1 1 1 1 0 1 0 1 1 0
                        0 0 0 0 1 0 0 0 0 1 1 0 0 0 0 1 0 0 0 0
                        1 1 1 0 1 1 1 0 0 1 1 0 0 1 1 1 0 1 1 1
                        1 1 1 0 1 0 0 0 0 0 0 0 0 0 0 1 0 1 1 1
                        1 1 1 0 1 0 1 1 1 2 2 1 1 1 0 1 0 1 1 1
                        0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0
                        0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0
                        1 1 1 0 1 0 1 1 1 1 1 1 1 1 0 1 0 1 1 1
                        1 1 1 0 1 0 0 0 0 0 0 0 0 0 0 1 0 1 1 1
                        0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0
                        0 1 1 1 0 0 0 0 0 1 1 0 0 0 0 0 1 1 1 0
                        0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0
                        1 1 0 1 0 1 0 1 1 1 1 1 1 0 1 0 1 0 1 1
                        0 0 0 0 0 1 0 0 0 1 1 0 0 0 1 0 0 0 0 0
                        0 1 1 1 1 1 1 1 0 1 1 0 1 1 1 1 1 1 1 0
                        0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0" },
                new MapModel { Id = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa2"), Name = "Map 2",
                Map = @"1 1 1 1 1 1 1 1 1 0 0 1 1 1 1 1 1 1 1 1
                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1
                        1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1
                        1 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1
                        1 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 0 1
                        1 0 0 1 0 0 1 1 1 1 1 1 1 1 0 0 1 0 0 1
                        1 0 0 1 0 0 0 0 0 1 1 0 0 0 0 0 1 0 0 1
                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1
                        1 1 1 0 1 0 1 1 1 2 2 1 1 1 0 1 0 1 1 1
                        0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0
                        0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0
                        1 1 1 0 1 0 1 1 1 1 1 1 1 1 0 1 0 1 1 1
                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1
                        1 0 0 1 0 0 0 0 0 1 1 0 0 0 0 0 1 0 0 1
                        1 0 0 1 0 0 1 1 1 1 1 1 1 1 0 0 1 0 0 1
                        1 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 0 1
                        1 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1
                        1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1
                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1
                        1 1 1 1 1 1 1 1 1 0 0 1 1 1 1 1 1 1 1 1" },
                new MapModel { Id = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa3"), Name = "Map 3",
                Map = @"1 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 1
                        1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1
                        1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 1 0 1
                        1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 1 0 1
                        1 1 0 1 1 1 1 1 1 0 1 0 1 0 1 0 0 1 0 1
                        0 0 0 1 0 0 0 1 0 0 1 0 1 0 1 0 0 0 0 0
                        0 0 1 1 1 1 0 1 0 1 1 0 1 0 1 1 1 1 1 0
                        0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
                        1 1 1 1 1 0 1 1 1 2 2 1 1 1 0 1 1 1 1 1
                        1 0 0 0 0 0 1 0 0 0 0 0 0 1 1 1 0 0 0 1
                        1 1 1 0 1 0 1 0 0 0 0 0 0 1 0 0 0 1 0 1
                        1 0 0 0 1 0 1 1 1 1 1 1 1 1 0 1 1 1 0 1
                        0 0 1 1 1 0 0 0 0 1 1 0 0 0 0 0 0 1 0 0
                        0 1 1 0 1 0 1 1 1 1 1 1 1 1 1 1 0 1 1 0
                        0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 1 0 0
                        1 1 1 0 1 0 1 0 1 1 1 1 1 1 1 1 1 1 0 1
                        1 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1
                        1 0 1 0 1 0 1 1 1 1 1 1 1 1 1 1 0 1 0 1
                        1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1
                        1 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 1" }
                );
        }
    }
}
