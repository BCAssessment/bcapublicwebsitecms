# TODO: maybe we can just inject the secrets directly into AKV since we have all the info here now.
output "rgname" {
  value       = module.bca-infrastructure.rgname
  description = "The Resource Group Name"
}

output "aks" {
  value       = module.bca-infrastructure.aksname
  description = "The name of the Azure Kubernetes Cluster"
}

output "acr" {
  value       = module.bca-infrastructure.acrname
  description = "The name of the Azure Container Registry"
}

output "akv" {
  value       = module.bca-infrastructure.akvname
  description = "The Azure Key Vault Name"
}

# TODO: remove this once AKV is fully working
output "psqluid" {
  value       = module.bca-infrastructure.psqladmin
  description = "The admin PSQL UID"
}

# TODO: remove this once AKV is fully working
output "psqlpwd" {
  value       = module.bca-infrastructure.psqlpassword
  description = "The admin PSQL PWD"
}

# output "aks-network" {
#   value = what_is_the_AKV_network_for_accessing_psql
#   description = "What is the network range for the aks"
# }
