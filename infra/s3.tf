resource "aws_s3_bucket" "s3_bucket" {
	bucket = "klontong-s3"

	tags = {
		project = "klontong"
	}
}