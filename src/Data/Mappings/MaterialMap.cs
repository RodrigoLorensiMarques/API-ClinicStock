

using API_ClinicStock.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API_ClinicStock.Data.Mappings
{
    public class MaterialMap : IEntityTypeConfiguration<Material>
    {
        public void Configure(EntityTypeBuilder<Material> builder)
        {
            builder.ToTable("materials");
            builder.HasKey(x => x.Id );

            builder.Property(x => x.Id)
            .HasColumnName("id");

            builder.Property(x => x.Name)
            .IsRequired()
            .HasColumnType("VARCHAR")
            .HasMaxLength(40)
            .HasColumnName("name");

            builder.Property(x => x.Packaging)
            .IsRequired()
            .HasColumnType("VARCHAR")
            .HasMaxLength(20)
            .HasColumnName("packaging");

            builder.Property(x => x.Amount)
            .IsRequired()
            .HasColumnType("INTEGER")
            .HasColumnName("amount");
        }
    }
}


