
data "aws_iam_policy_document" "ec2_assumrole_policy" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "ecr_iam_policy" {
  statement {
    effect    = "Allow"
    resources = ["*"]
    actions = [
      "ecr:GetAuthorizationToken",
      "ecr:BatchGetImage",
      "ecr:GetDownloadUrlForLayer"
    ]
  }
}

resource "aws_iam_role" "ec2_iam_role" {
  name = "iam_klontong_ec2"

  assume_role_policy = data.aws_iam_policy_document.ec2_assumrole_policy.json
  tags = {
    project = "klontong"
  }
}

resource "aws_iam_role_policy" "ec2_policy" {
  name = "iam_policy_klontong_ec2"
  role = aws_iam_role.ec2_iam_role.id

  policy = data.aws_iam_policy_document.ecr_iam_policy.json
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "iam_klontong_instance_ec2"
  role = aws_iam_role.ec2_iam_role.name
}