data "mongodbatlas_roles_org_id" "cimbraien" {
}

resource "mongodbatlas_project" "atlas_project"{
	name = "klontong"

	org_id = data.mongodbatlas_roles_org_id.cimbraien.org_id
}

resource "mongodbatlas_cluster" "atlas_cluster" {
	project_id = mongodbatlas_project.atlas_project.id
	name = "klontong"

	provider_name = "TENANT"
	backing_provider_name = "AWS"
	provider_region_name = "AP_NORTHEAST_1"
	provider_instance_size_name = "M0"
}