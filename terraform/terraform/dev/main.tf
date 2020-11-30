# Used for the names for resources that are required to be unique
resource "random_string" "prefix" {
  length  = 8
  special = false
  lower   = true
  upper   = false
  number  = true
}

module "bca-infrastructure" {
  source = "git::https://github.com/bashbang/bca-tfmodues.git?ref=dev-0.0.51"
  # General module variables
  rg_name  = "${var.environment}-POC"
  location = var.location
  subscription_id = var.subscription_id

  # AKS Variables
  aks_cluster_name = "${var.environment}-aks"
  dns_prefix       = "${var.environment}-k8s"
  client_id        = var.client_id
  client_secret    = var.client_secret

  # ACR variables
  acr_name = "${var.environment}${random_string.prefix.id}acr"

  # PostgreSQL variables:
  psql_name = "${var.environment}-${random_string.prefix.id}-psql"

  # AKV variables
  avk_name = "BCA-KeyVaultPOC"

  # CSI helm Deployment
  namespace = var.namespace
}
