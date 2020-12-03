#
# This TF sets up an environment for an Azure
#

# The basic setup of the TF environment
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 2.26"
    }

  }
}

#terraform {
#  backend "remote" {
#    organization = "BC-Assessment"
#
#    workspaces {
#      name = "GitHub-Terraform"
#    }
#    
#}


# #setup for TF cloud - CLI version
# terraform {
#   required_version = ">= 0.13.4"
#   required_providers {
#     azurerm = {
#       source = "hashicorp/azurerm"
#       version = "~> 2.0"
#     }
#   }
#   backend "remote" {
#     organization = "BCAssessment"
#     workspaces {
#       name = "test"
#     }
#   }
# }


provider "azurerm" {
  version         = "=2.38.0"
  # subscription_id = var.subscription_id
  # client_id       = var.client_id
  # client_secret   = var.client_secret
  # tenant_id       = var.tenant_id

  features {}
}

# terraform {
#   required_providers {
#     kubernetes = {
#       source = "hashicorp/kubernetes"
#     }
#     azurerm = {
#       source "hashicorp/azurerm"
#       version = "~>2.0"
#     }
#   }
# }
