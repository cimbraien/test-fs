data "aws_vpc" "default" {
  default = true
}

resource "aws_security_group" "sg" {
  name   = "sg_klontong"
  vpc_id = data.aws_vpc.default.id

  ingress {
    from_port   = 22
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}