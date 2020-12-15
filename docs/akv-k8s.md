# Using Azure Key Vault (AKV) with Kubernetes (k8s)

Secrets management and usage for this project starts with creating an Azure Key Vault to store all our secrets. This allows the secrets to be centrally located with easier controls and management. We'll use Active Directory to manage the service principal identity(s). The service principal will be used by k8s to access the secrets for use within k8s CSI pods. On k8s we'll create a Container Storage Interface (CSI) that will act as a proxy for allowing the secrets to be retrieved by the containers. We'll then config the pods to use those secrets and store them in both as environment variables and as a volume on the require containers.

1. Create AKV and store secrets
1. Create Service Principal Account
1. Create and Config CSI (Assumes working k8s already)
1. Create CSI Store
1. Config Deployment to use CSI and store secrets in environmental variables

**TODO:** The document is showing the manual process of deploy AKV and setting it up. Terraform could be used to do some of this deployment.
**NOTES:** There's an assumed baseline knowledge of Kubernetes and Azure and the associated toolset used (eg: kubectl, helm, az cli).

# 1. Create AKV
`az keyvault create --name "<your-unique-keyvault-name>" --resource-group "<ResourceGroup>" --location "<REGIOIN>}"`
eg: `az keyvault create --name "BCA-KeyVault" --resource-group "dev-qg9132f9-k8s" --location "canadacentral"`

## Store your secretes in AKV:
The secrets can be placed into AKV either through CLI or the console.  Below is the console method:
host: devqg9132f9cosmosdb.documents.azure.com
uid: devqg9132f9cosmosdb
pwd: hR0qcXHyvZcQ0ifU62mwx21scXv90dxkMxMEt6NZ7PKXFw836B4HidfSKDIWq1anXfPHpHSgntDJ52Ti4Ew8qA==

`az keyvault secret set --vault-name "BCA-KeyVault" --name "DBHOST" --value "devqg9132f9cosmosdb.documents.azure.com"`
`az keyvault secret set --vault-name "BCA-KeyVault" --name "DBUID" --value "devqg9132f9cosmosdb"`
`az keyvault secret set --vault-name "BCA-KeyVault" --name "DBPWD" --value "hR0qcXHyvZcQ0ifU62mwx21scXv90dxkMxMEt6NZ7PKXFw836B4HidfSKDIWq1anXfPHpHSgntDJ52Ti4Ew8qA=="`

# Create a Service Principal
`az ad sp create-for-rbac --name bca-akv-serviceprincipal --skip-assignment`

## Sample output:
```
Changing "bca-akv-serviceprincipal" to a valid URI of "http://bca-akv-serviceprincipal", which is the required format used for service principal names
{
  "appId": "de5f93a8-edfa-4ff3-a2b4-4ec8da476e10",
  "displayName": "bca-akv-serviceprincipal",
  "name": "http://bca-akv-serviceprincipal",
  "password": "LXTpGEQB3O6uAqy-f_BNL0dR9ePqD-eled",
  "tenant": "65e4e06f-f263-4c1f-becb-90deb8c2d9ff"
}
```
**Note:** appId = Service Principal Client ID

`az role assignment create --role Reader --assignee <SERVICEPROVIDER_CLIENT_ID> --scope /subscriptions/<SUBSCRIPTIONID>/resourcegroups/<KEYVAULT_RESOURCE_GROUP>/providers/Microsoft.KeyVault/vaults/<KEYVAULT_NAME>)`

eg: `az role assignment create --role Reader --assignee de5f93a8-edfa-4ff3-a2b4-4ec8da476e10 --scope /subscriptions/8a4d3410-a91d-4bc9-b0c1-169bbac36d0a/resourcegroups/dev-qg9132f9-k8s/providers/Microsoft.KeyVault/vaults/BCA-KeyVault`

`az keyvault set-policy -n $KEYVAULT_NAME --secret-permissions get --spn $SP_CLIENT_ID`
eg: `az keyvault set-policy -n BCA-KeyVault --secret-permissions get --spn de5f93a8-edfa-4ff3-a2b4-4ec8da476e10`

from the output of that get the principalID:
  "principalId": "e7f6b9cb-81f5-4827-a021-643d6c589ecd",

`az keyvault set-policy -n BCA-KeyVault --secret-permissions get --spn 92eca3f9-8e67-4328-b666-bf497358f3a8`
`az keyvault set-policy -n BCA-KeyVault --key-permissions get --spn 92eca3f9-8e67-4328-b666-bf497358f3a8`

Now store the Service Principal login credentials as secrets within Kubernetes

`kubectl create secret generic secrets-store-creds --from-literal clientid=<SERVICEPRINCIPAL_CLIENT_ID> --from-literal clientsecret=<SERVICEPRINCIPAL_PASSWORD>`

eg: `kubectl create secret generic secrets-store-creds --from-literal clientid=de5f93a8-edfa-4ff3-a2b4-4ec8da476e10 --from-literal clientsecret=65e4e06f-f263-4c1f-becb-90deb8c2d9ff`

**NOTE:**
- to revert this access: `kubectl delete secrets secrets-store-creds`
- to reset the creds: `az ad sp credential reset --name bca-akv-serviceprincipal --credential-description "APClientSecret" --query password -o tsv`

# Container Storage Service (CSI)
helm repo add csi-secrets-store-provider-azure https://raw.githubusercontent.com/Azure/secrets-store-csi-driver-provider-azure/master/charts
helm install csi-secrets-store-provider-azure/csi-secrets-store-provider-azure --generate-name

**Note:** this deployed is on a per cluster. You can deploy to the default namespace or perhaps the "tools" namespace.

# Consume the secrets
There's config within the SecretProviderClass that both adds the secrets to the environment variables as well as mounts the secrets onto a volume. Right now we're only using the environment variables.  I've left the volume mount in place as AKV could be used for certificate storage. Consuming that secret and storing on the a filesystem is the default way of applications using certificates.
`kubectl apply -f azure-kv-provider.yaml -n development`

