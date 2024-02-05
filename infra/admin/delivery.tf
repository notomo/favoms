module "gh_oidc" {
  source  = "terraform-google-modules/github-actions-runners/google//modules/gh-oidc"
  version = "~> 3.1"

  project_id  = var.project_id
  pool_id     = "favoms-pool"
  provider_id = "github-actions"
  sa_mapping = {
    "favoms-delivery" = {
      sa_name   = "projects/${var.project_id}/serviceAccounts/favoms-delivery@${var.project_id}.iam.gserviceaccount.com"
      attribute = "attribute.repository/notomo/favoms"
    }
  }
  attribute_condition   = <<-EOT
    assertion.repository=='notomo/favoms'
  EOT
  provider_display_name = "github-actions"
}

resource "google_service_account" "delivery" {
  account_id   = "favoms-delivery"
  display_name = "favoms delivery automation"
}

resource "google_project_iam_member" "delivery_appengine_deployer" {
  role    = "roles/appengine.deployer"
  member  = "serviceAccount:${google_service_account.delivery.email}"
  project = var.project_id
}

resource "google_project_iam_member" "delivery_appengine_service_admin" {
  role    = "roles/appengine.serviceAdmin"
  member  = "serviceAccount:${google_service_account.delivery.email}"
  project = var.project_id
}

resource "google_project_iam_member" "delivery_service_account_user" {
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.delivery.email}"
  project = var.project_id
}

resource "google_project_iam_member" "delivery_cloudbuild_editor" {
  role    = "roles/cloudbuild.builds.editor"
  member  = "serviceAccount:${google_service_account.delivery.email}"
  project = var.project_id
}

resource "google_project_iam_member" "delivery_storage_object_user" {
  role    = "roles/storage.objectUser"
  member  = "serviceAccount:${google_service_account.delivery.email}"
  project = var.project_id
  condition {
    title      = "limit_to_tfstate_bucket"
    expression = <<-EOT
      resource.name == "projects/_/buckets/favoms-tfstate" ||
      resource.name.startsWith("projects/_/buckets/favoms-tfstate/objects/")
    EOT
  }
}

resource "google_project_iam_member" "app_deploy_storage_object_user" {
  role    = "roles/storage.objectUser"
  member  = "serviceAccount:${google_service_account.delivery.email}"
  project = var.project_id
  condition {
    title      = "limit_to_app_bucket"
    expression = <<-EOT
      resource.name == "projects/_/buckets/staging.favoms.appspot.com" ||
      resource.name.startsWith("projects/_/buckets/staging.favoms.appspot.com/objects/")
    EOT
  }
}
