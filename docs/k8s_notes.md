## Manage k8s:

Managing kubernetes isn't a straight line. Here's various CLI commands and tools to help with your journey:

# Tools:
kubectx - help you move between contexts
kubens - help you navigate through different name spaces
kubectl - the main CLI interface to manage kubernetes
stern - used for watching logs

Get CLI to use for connecting to azure k8s cluster
`az aks install-cli`
`az aks get-credentials --resource-group dev-qg9132f9-k8s --name dev-qg9132f9-aks`
`kubectl get nodes`

To see what config you're connected to on your workstation:
`kubectl config view --minify=true`

Check to see if there's any k8s upgrades available
`az aks get-upgrades --resource-group dev-qg9132f9-k8s --name dev-qg9132f9-aks --output table `

upgrade if you wish:
`az aks upgrade --resource-group dev-qg9132f9-k8s --name dev-qg9132f9-aks --kubernetes-version 1.18.10`

Add the cluster to your kubectl config
`az aks get-credentials --resource-group dev-POC --name dev-aks`

list context(s)
`kubectx`

delete a context
`kubeconfig delete-context {context}`

list namespaces
`kubens`
change namespace
`kubens {namespace}`

create a namespace from the provided namespace manifest file
`kubectl create -f manifest/namespace-development.yml`

This secret is for allowing k8s to connect to acr to pull the images.
`kubectl create secret generic acr_creds --from-literal=acr_login=dev4gqggmqqacr --from-literal=acr_password=bTAILW=gHWfaJLacj1bt5pxVF8q0sQjo`

we really want to pull secrets from AKV to sync to k8s, but it's not working currently, so generate the secrets directly in k8s for the container to pull from.
`kubectl create secret generic akv-secrets --from-literal=DBUID=cqfizfjv@dev-4gqggmqq-psql.postgres.database.azure.com --from-literal=DBPWD='qpxRtNMib57BMNn8' --from-literal=DBHOST='dev-4gqggmqq-psql.postgres.database.azure.com' -n development`

Once secrets are set, they can't be edited/updated. The only way to alter them is to delete the secret and recreate. So this is how you delete the k8s secret.
`kubectl delete secret akv-secrets -n development`

get pods list
`kubectl get pods` 

connect to pod - needs to be running for this to work.  Generally this is done for debug purposes.
`kubectl exec -it {podname} -- /bin/bash`