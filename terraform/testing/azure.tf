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

# setup for TF cloud - CLI version
# TODO: this will change once we have a github account setup
terraform {
  backend "remote" {
    organization = "BCAssessment"

    workspaces {
      name = "testing"
    }
  }
}


provider "azurerm" {
  # Whilst version is optional, we /strongly recommend/ using it to pin the version of the Provider being used
  version         = "~>2.0"
  subscription_id = var.subscription_id
  client_id       = var.client_id
  client_secret   = var.client_secret
  tenant_id       = var.tenant_id

  features {}
}
