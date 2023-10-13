resource "aws_ecr_repository" "ecr_backend" {
  name = "klontong_backend"
}

locals {
	ECR_URL = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${var.aws_region}.amazonaws.com"
}