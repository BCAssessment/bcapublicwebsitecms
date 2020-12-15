## Manage k8s:

Managing kubernetes isn't a straight line. Here's various CLI commands and tools to help with your journey:

# Tools:
kubectx - help you move between contexts
kubens - help you navigate through different name spaces
kubectl - the main CLI interface to manage kubernetes


Get CLI to use for connecting to azure k8s cluster
`az aks install-cli`
`az aks get-credentials --resource-group dev-qg9132f9-k8s --name dev-qg9132f9-aks`
`kubectl get nodes`

Check to see if there's any k8s upgrades available
`az aks get-upgrades --resource-group dev-qg9132f9-k8s --name dev-qg9132f9-aks --output table `

upgrade if you wish:
`az aks upgrade --resource-group dev-qg9132f9-k8s --name dev-qg9132f9-aks --kubernetes-version 1.18.10`
