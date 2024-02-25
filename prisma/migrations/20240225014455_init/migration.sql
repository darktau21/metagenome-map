-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "area";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "metagenome";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "sample";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateTable
CREATE TABLE "area"."areas" (
    "id" SERIAL NOT NULL,
    "metagenome_id" INTEGER,
    "coords_id" INTEGER NOT NULL,
    "original_id" TEXT,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area"."coords" (
    "id" SERIAL NOT NULL,
    "polygon" geography(Polygon, 4326) NOT NULL,

    CONSTRAINT "coords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area"."string_propertiy_values" (
    "id" SERIAL NOT NULL,
    "property_id" INTEGER NOT NULL,
    "value_id" INTEGER NOT NULL,
    "area_id" INTEGER NOT NULL,

    CONSTRAINT "string_propertiy_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area"."string_properties" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "group_id" INTEGER,

    CONSTRAINT "string_properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area"."string_property_possible_values" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "property_id" INTEGER NOT NULL,

    CONSTRAINT "string_property_possible_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area"."float_properties" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "units" TEXT,
    "group_id" INTEGER,

    CONSTRAINT "float_properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area"."float_property_values" (
    "id" SERIAL NOT NULL,
    "property_id" INTEGER NOT NULL,
    "area_id" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "float_property_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area"."property_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "property_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metagenome"."phylums" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "phylums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metagenome"."metagenomes" (
    "id" SERIAL NOT NULL,
    "original_id" TEXT,

    CONSTRAINT "metagenomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metagenome"."phylum_values" (
    "id" SERIAL NOT NULL,
    "phylum_id" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "metagenome_id" INTEGER NOT NULL,

    CONSTRAINT "phylum_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metagenome"."diagrams" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "metagenome_id" INTEGER NOT NULL,

    CONSTRAINT "diagrams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sample"."samples" (
    "id" SERIAL NOT NULL,
    "selection_date" DATE NOT NULL,
    "coords_id" INTEGER NOT NULL,
    "original_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "samples_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sample"."coords" (
    "id" SERIAL NOT NULL,
    "point" geography(Point, 4326) NOT NULL,

    CONSTRAINT "coords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sample"."string_propertiy_values" (
    "id" SERIAL NOT NULL,
    "property_id" INTEGER NOT NULL,
    "value_id" INTEGER NOT NULL,
    "sample_id" INTEGER NOT NULL,

    CONSTRAINT "string_propertiy_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sample"."string_properties" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "group_id" INTEGER,

    CONSTRAINT "string_properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sample"."string_property_possible_values" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "property_id" INTEGER NOT NULL,

    CONSTRAINT "string_property_possible_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sample"."float_properties" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "group_id" INTEGER,
    "units" TEXT,

    CONSTRAINT "float_properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sample"."float_property_values" (
    "id" SERIAL NOT NULL,
    "property_id" INTEGER NOT NULL,
    "sample_id" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "float_property_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sample"."property_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "property_groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "coords_polygon_idx" ON "area"."coords" USING GIST ("polygon");

-- CreateIndex
CREATE UNIQUE INDEX "string_propertiy_values_area_id_property_id_key" ON "area"."string_propertiy_values"("area_id", "property_id");

-- CreateIndex
CREATE UNIQUE INDEX "string_properties_name_key" ON "area"."string_properties"("name");

-- CreateIndex
CREATE UNIQUE INDEX "string_property_possible_values_property_id_value_key" ON "area"."string_property_possible_values"("property_id", "value");

-- CreateIndex
CREATE UNIQUE INDEX "float_properties_name_key" ON "area"."float_properties"("name");

-- CreateIndex
CREATE UNIQUE INDEX "float_property_values_area_id_property_id_key" ON "area"."float_property_values"("area_id", "property_id");

-- CreateIndex
CREATE UNIQUE INDEX "phylums_name_key" ON "metagenome"."phylums"("name");

-- CreateIndex
CREATE UNIQUE INDEX "phylum_values_metagenome_id_phylum_id_key" ON "metagenome"."phylum_values"("metagenome_id", "phylum_id");

-- CreateIndex
CREATE UNIQUE INDEX "diagrams_metagenome_id_key" ON "metagenome"."diagrams"("metagenome_id");

-- CreateIndex
CREATE UNIQUE INDEX "samples_name_key" ON "sample"."samples"("name");

-- CreateIndex
CREATE INDEX "coords_point_idx" ON "sample"."coords" USING GIST ("point");

-- CreateIndex
CREATE UNIQUE INDEX "string_propertiy_values_sample_id_property_id_key" ON "sample"."string_propertiy_values"("sample_id", "property_id");

-- CreateIndex
CREATE UNIQUE INDEX "string_properties_name_key" ON "sample"."string_properties"("name");

-- CreateIndex
CREATE UNIQUE INDEX "string_property_possible_values_property_id_value_key" ON "sample"."string_property_possible_values"("property_id", "value");

-- CreateIndex
CREATE UNIQUE INDEX "float_properties_name_key" ON "sample"."float_properties"("name");

-- CreateIndex
CREATE UNIQUE INDEX "float_property_values_sample_id_property_id_key" ON "sample"."float_property_values"("sample_id", "property_id");

-- AddForeignKey
ALTER TABLE "area"."areas" ADD CONSTRAINT "areas_coords_id_fkey" FOREIGN KEY ("coords_id") REFERENCES "area"."coords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area"."areas" ADD CONSTRAINT "areas_metagenome_id_fkey" FOREIGN KEY ("metagenome_id") REFERENCES "metagenome"."metagenomes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area"."string_propertiy_values" ADD CONSTRAINT "string_propertiy_values_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "area"."areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area"."string_propertiy_values" ADD CONSTRAINT "string_propertiy_values_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "area"."string_properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area"."string_propertiy_values" ADD CONSTRAINT "string_propertiy_values_value_id_fkey" FOREIGN KEY ("value_id") REFERENCES "area"."string_property_possible_values"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area"."string_properties" ADD CONSTRAINT "string_properties_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "area"."property_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area"."string_property_possible_values" ADD CONSTRAINT "string_property_possible_values_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "area"."string_properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area"."float_properties" ADD CONSTRAINT "float_properties_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "area"."property_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area"."float_property_values" ADD CONSTRAINT "float_property_values_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "area"."areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area"."float_property_values" ADD CONSTRAINT "float_property_values_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "area"."float_properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metagenome"."phylum_values" ADD CONSTRAINT "phylum_values_metagenome_id_fkey" FOREIGN KEY ("metagenome_id") REFERENCES "metagenome"."metagenomes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metagenome"."phylum_values" ADD CONSTRAINT "phylum_values_phylum_id_fkey" FOREIGN KEY ("phylum_id") REFERENCES "metagenome"."phylums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metagenome"."diagrams" ADD CONSTRAINT "diagrams_metagenome_id_fkey" FOREIGN KEY ("metagenome_id") REFERENCES "metagenome"."metagenomes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sample"."samples" ADD CONSTRAINT "samples_coords_id_fkey" FOREIGN KEY ("coords_id") REFERENCES "sample"."coords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sample"."string_propertiy_values" ADD CONSTRAINT "string_propertiy_values_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "sample"."string_properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sample"."string_propertiy_values" ADD CONSTRAINT "string_propertiy_values_sample_id_fkey" FOREIGN KEY ("sample_id") REFERENCES "sample"."samples"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sample"."string_propertiy_values" ADD CONSTRAINT "string_propertiy_values_value_id_fkey" FOREIGN KEY ("value_id") REFERENCES "sample"."string_property_possible_values"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sample"."string_properties" ADD CONSTRAINT "string_properties_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "sample"."property_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sample"."string_property_possible_values" ADD CONSTRAINT "string_property_possible_values_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "sample"."string_properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sample"."float_properties" ADD CONSTRAINT "float_properties_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "sample"."property_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sample"."float_property_values" ADD CONSTRAINT "float_property_values_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "sample"."float_properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sample"."float_property_values" ADD CONSTRAINT "float_property_values_sample_id_fkey" FOREIGN KEY ("sample_id") REFERENCES "sample"."samples"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
