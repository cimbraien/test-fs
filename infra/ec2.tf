resource "aws_instance" "ec2" {
  ami           = "ami-07a920f17020024b9"
  instance_type = "t3.micro"

  vpc_security_group_ids = [
    aws_security_group.sg.id
  ]

  tags = {
    project = "klontong"
  }

  iam_instance_profile = aws_iam_instance_profile.ec2_profile.name

  user_data = <<EOF
		#!/bin/bash
		set -ex
		sudo yum update -y
		sudo yum install docker -y
		sudo service docker start
		sudo usermod -a -G docker ec2-user
		sudo curl -L https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
		sudo chmod +x /usr/local/bin/docker-compose
		ECR_URL=${data.aws_caller_identity.current.account_id}.dkr.ecr.${var.aws_region}.amazonaws.com
		aws ecr get-login-password | docker login ECR_URL
		docker pull ${ECR_URL}/${data.aws_ecr_repository.ecr_backend.name}:latest
	EOF
}