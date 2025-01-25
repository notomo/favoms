terraform {
  required_version = "~> 1.9"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.17.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 6.17.0"
    }
  }
  backend "gcs" {
    bucket = "favoms-tfstate"
    prefix = "admin"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}
