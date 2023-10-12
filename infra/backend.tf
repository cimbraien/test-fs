terraform {
  cloud {
    organization = "brik_test"

    workspaces {
      name = "klontong"
    }
  }

  required_version = ">= 1.1.2"
}