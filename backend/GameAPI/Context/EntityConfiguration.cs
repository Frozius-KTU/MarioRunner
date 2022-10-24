using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using GameAPI.Model;

namespace GameAPI.Context
{
    // public class AddressEntityConfiguration : BaseEntityConfiguration<AddressModel>
    // {
    //     protected override void ConfigureEntity(EntityTypeBuilder<AddressModel> builder)
    //     {
    //         builder.ToTable("Address");

    //         builder.Property(x => x.City).IsRequired();
    //         builder.Property(x => x.Street).IsRequired();
    //         builder.Property(x => x.Building).IsRequired();
    //         builder.Property(x => x.Apartment).IsRequired();
    //         builder.Property(x => x.ZipCode).IsRequired();
    //     }
    // }

    // public class CartEntityConfiguration : BaseEntityConfiguration<CartModel>
    // {
    //     protected override void ConfigureEntity(EntityTypeBuilder<CartModel> builder)
    //     {
    //         builder.ToTable("Carts");

    //         builder.Property(x => x.Quantity).IsRequired();

    //         builder.HasOne(x => x.User)
    //             .WithMany()
    //             .HasForeignKey(x => x.UserId)
    //             .IsRequired()
    //             .OnDelete(DeleteBehavior.Restrict);

    //         builder.HasOne(x => x.Item)
    //             .WithMany()
    //             .HasForeignKey(x => x.ItemId)
    //             .IsRequired()
    //             .OnDelete(DeleteBehavior.Restrict);
    //     }
    // }

    // public class ItemBalanceEntityConfiguration : BaseEntityConfiguration<ItemBalanceModel>
    // {
    //     protected override void ConfigureEntity(EntityTypeBuilder<ItemBalanceModel> builder)
    //     {
    //         builder.ToTable("ItemBalance");

    //         builder.Property(x => x.Amount);
    //         builder.Property(x => x.Date).IsRequired();

    //         builder.HasOne(x => x.Item)
    //             .WithMany()
    //             .HasForeignKey(x => x.ItemId)
    //             .IsRequired()
    //             .OnDelete(DeleteBehavior.Restrict);
    //     }
    // }

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

    


    // public class OrderItemEntityConfiguration : BaseEntityConfiguration<OrderItemModel>
    // {
    //     protected override void ConfigureEntity(EntityTypeBuilder<OrderItemModel> builder)
    //     {
    //         builder.ToTable("OrderItem");

    //         builder.Property(x => x.Quantity).IsRequired();

    //         builder.HasOne(x => x.Order)
    //             .WithMany()
    //             .HasForeignKey(x => x.OrderId)
    //             .IsRequired()
    //             .OnDelete(DeleteBehavior.Restrict);

    //         builder.HasOne(x => x.Item)
    //             .WithMany()
    //             .HasForeignKey(x => x.ItemId)
    //             .IsRequired()
    //             .OnDelete(DeleteBehavior.Restrict);
    //     }
    // }

    // public class OrderEntityConfiguration : BaseEntityConfiguration<OrderModel>
    // {
    //     protected override void ConfigureEntity(EntityTypeBuilder<OrderModel> builder)
    //     {
    //         builder.ToTable("Order");

    //         builder.Property(x => x.Date).IsRequired();
    //         builder.Property(x => x.Sum).IsRequired();
    //         builder.Property(x => x.Discount).IsRequired();
    //         builder.Property(x => x.Comment).IsRequired();
    //         builder.Property(x => x.Status).IsRequired();

    //         builder.HasOne(x => x.User)
    //             .WithMany()
    //             .HasForeignKey(x => x.UserId)
    //             .IsRequired()
    //             .OnDelete(DeleteBehavior.Restrict);
    //     }
    // }

    // public class RouteEntityConfiguration : BaseEntityConfiguration<RouteModel>
    // {
    //     protected override void ConfigureEntity(EntityTypeBuilder<RouteModel> builder)
    //     {
    //         builder.ToTable("Route");

    //         builder.Property(x => x.DispatchDate).IsRequired();
    //         builder.Property(x => x.DeliveryDate).IsRequired();

    //         builder.HasOne(x => x.Order)
    //             .WithMany()
    //             .HasForeignKey(x => x.OrderId)
    //             .IsRequired()
    //             .OnDelete(DeleteBehavior.Restrict);

    //         builder.HasOne(x => x.User)
    //             .WithMany()
    //             .HasForeignKey(x => x.UserId)
    //             .IsRequired()
    //             .OnDelete(DeleteBehavior.Restrict);

    //         builder.HasOne(x => x.Address)
    //             .WithMany()
    //             .HasForeignKey(x => x.AddressId)
    //             .IsRequired()
    //             .OnDelete(DeleteBehavior.Restrict);
    //     }
    // }

    // public class UserEntityConfiguration : BaseEntityConfiguration<UserModel>
    // {
    //     protected override void ConfigureEntity(EntityTypeBuilder<UserModel> builder)
    //     {
    //         builder.ToTable("Users");

    //         builder.Property(x => x.Name).IsRequired();
    //         builder.Property(x => x.Lastname).IsRequired();
    //         builder.Property(x => x.Email);
    //         builder.Property(x => x.Phone);
    //         builder.Property(x => x.Type).IsRequired();
    //         builder.Property(x => x.Login).IsRequired();
    //         builder.Property(x => x.Password).IsRequired();
    //     }
    // }
}
