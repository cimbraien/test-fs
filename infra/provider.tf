terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.20.1"
    }

    mongodbatlas = {
      source = "mongodb/mongodbatlas"
      version = "~> 1.12.1"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  type    = string
  default = "ap-southeast-3"
}

data "aws_caller_identity" "current" {}

provider "mongodbatlas" {
}