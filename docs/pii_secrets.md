# Glossory of Terms

This document provides descriptions of various terms and includes assessments of their impact on Personally Identifiable Information (PII), Organizaional Indentifiable Information (OII), and Secrets (should these values be stored in a Secret store).

[appId](https://docs.microsoft.com/en-us/azure-stack/operator/azure-stack-create-service-principals?view=azs-2008&pivots=state-disconnected): 
    Definition: An application that needs to deploy or configure resources through Azure Resource Manager must be represented by its own identity. Just as a user is represented by a security principal called a user principal, an app is represented by a service principal. The service principal provides an identity for your app, allowing you to delegate only the necessary permissions to the app.
* PII: No
* OII: No
* Secret: No - easily obtained by any user of the service.

password (appId password):
* PII: No
* OII: No
* Secret: yes - this combined with the appId grants access to the application.

[tenantId](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-create-new-tenant#:~:text=A%20tenant%20is%20a%20representation,Microsoft%20Intune%2C%20or%20Microsoft%20365.): A tenant is a representation of an organization. It's a dedicated instance of Azure AD that an organization or app developer receives when the organization or app developer creates a relationship with Microsoft-- like signing up for Azure, Microsoft Intune, or Microsoft 365.
* PII: No
* OII: No
* Secret - No - easily obtained by any consumer of the service.

[resourceGroup](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview): Azure Resource Manager is the deployment and management service for Azure. It provides a management layer that enables you to create, update, and delete resources in your Azure account. You use management features, like access control, locks, and tags, to secure and organize your resources after deployment.
* PII: No
* OII: No
* Secret: No

[subscriptionId](https://docs.microsoft.com/en-us/microsoft-365/enterprise/subscriptions-licenses-accounts-and-tenants-for-microsoft-cloud-offerings?view=o365-worldwide):A subscription is an agreement with Microsoft to use one or more Microsoft cloud platforms or services, for which charges accrue based on either a per-user license fee or on cloud-based resource consumption.
* PII: No
* OII: Possible.
* Secret - Maybe. It's not information generally known to the public nor easily obtained, but if revealed no actions can taken with this information alone. An authorization token still would need to be obtained.
