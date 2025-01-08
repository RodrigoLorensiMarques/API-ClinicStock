using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_ClinicStock.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API_ClinicStock.Data.Mappings
{
    public class MedicineMap : IEntityTypeConfiguration<Medicine>
    {
        public void Configure(EntityTypeBuilder<Medicine> builder)
        {
            builder.ToTable("medicines");
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
            .IsRequired()
            .HasColumnType("VARCHAR")
            .HasMaxLength(40)
            .HasColumnName("name");

            builder.Property(x => x.Milligram)
            .HasColumnType("DECIMAL")
            .HasColumnName("miligram");

            builder.Property(x => x.Packaging)
            .IsRequired()
            .HasColumnType("VARCHAR")
            .HasMaxLength(20)
            .HasColumnName("packaging");

            builder.Property(x => x.Amount)
            .IsRequired()
            .HasColumnType("INTEGER")
            .HasColumnName("amount");

            builder.Property(x => x.CreateDate)
            .IsRequired()
            .HasColumnName("create_date")
            .HasColumnType("SMALLDATETIME");

            builder.Property(x => x.LastUpdateDate)
            .IsRequired()
            .HasColumnName("last_update_date")
            .HasColumnType("SMALLDATETIME");
        }
    }
}