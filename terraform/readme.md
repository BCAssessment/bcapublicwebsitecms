# Terraform Setup for Azure
To allow for easier editing of code the bulk of the Terraform code is in a separate git repository. We'll reference this module repository and pass in different variables from this repo based on the requested environment.

TODO: We still need to design a git promotion strategy to move from dev to testing to production. Initial plan is to use the same module repo with tags to allow for manual versioning.

## Assumptions

1. Microsoft az cli installed
1. Microsoft Azure account (tenant) created with valid permissions to create resources along with an established subscription.
1. git installed and configured to a github account
1. github access to the appropriate git repositories.
1. terraform cloud account (optional)
1. code editor. VSCode recommended.
1. kubectl, kubectx, kubens installed

## Setup Terraform Cloud (optional)

We fist need to setup a Azure service account to allow Terraform Cloud to manage the Azure resources and the Terraform .tfstate file.

Detailed instructions [here](https://www.terraform.io/docs/providers/azurerm/guides/service_principal_client_secret.html#configuring-the-service-principal-in-terraform):

Basically do this:
`az login`
`az account list`
If there's several subscriptions then you may need to specify which subscription you wish to use. Use "id" from the account list (not homeTenantID, or tenantID)
`az account set --subscription="SUBSCRIPTION_ID"`

Let's now create the service account
`az ad sp create-for-rbac --rol="Contributor" --name="DisplayNameHere" --scopes="/subscriptions/SUBSCRIPTION_ID"`

This will output the following table

```{
  "appId": "00000000-0000-0000-0000-000000000000",
  "displayName": "azure-cli-2017-06-05-10-41-15",
  "name": "http://azure-cli-2017-06-05-10-41-15",
  "password": "0000-0000-0000-0000-000000000000",
  "tenant": "00000000-0000-0000-0000-000000000000"
}
```

which maps to:
* appId is the client_id defined above.
* password is the client_secret defined above.
* tenant is the tenant_id defined above.

Confirm the creation of the account:
`az login --service-principal -u CLIENT_ID -p CLIENT_SECRET --tenant TENANT_ID`

see what you can see:
`az vm list-sizes --location canadacentral`

then log out of the service account
`az logout`

If you don't have a namespace yet created in Terraform Cloud go ahead and create one

Lastly in Terraform cloud, under workspace you wish to work in, we need to config Terraform Cloud with these variables:
**ensure the client_secret is set to "sensitive"**

subscription_id={your Azure subscription ID}
tenant_id={tenant}
client_id={appId}
client_secret={password} - displayed when the service account was created **ensure the client_secret is set to "sensitive"**
}

## Execute Terraform Code

Navigate to the terraform folder and environment you wish to deploy:
`cd terraform/dev/`

Init the terraform environment. This downloads module and provider dependencies.
`terraform init`

Execute the terraform plan which will output to the screen what terraform is expected to do.  It will show various resources that will be created.  If this is a consecutive run it will show you the changes that terraform will attempt to make. This may include additions, changes, and deletions.
`terraform plan`

If you're happy with the plan, proceed with executing the instructions with:
`terraform apply`
