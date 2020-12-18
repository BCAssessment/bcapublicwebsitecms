Strapi is an open-source headless CMS that is used to manage banners and banner content in this application.

## Configuring Strapi
Before running Strapi, you need to configure the following environment variables. This can be done by creating a .env file based on the .env.example file found [here](.env.example). The variables are defined in the table below.

| Variable Name   | Description                                                                                               | Example Value                   |
|-----------------|-----------------------------------------------------------------------------------------------------------|---------------------------------|
| PORT            | Sets the port that this application runs on. Defaults to 1337.                                            | 1337                            |
| PREVIEW_SITE    | Sets the URL that the preview button points to. This button is shown when editing carousels in Strapi.    | http://localhost:8080/carousels |
| PRODUCTION_SITE | Sets the URL that the production button points to. This button is shown when editing carousels in Strapi. | http://localhost:8080/          |

Whenever a change is made to an environment variable, you will need to build Strapi. Details on how to do this are below.

## Building and Running Strapi

When you're running Strapi for the first time, you'll need to install all of its packages first. First, you need to install ckeditor, a rich text editor plugin that Strapi has been modified to use. This can be done by navigating to the `strapi/app/plugins/wysiwyg/` directory and running

    npm install

When this is complete, you need to install Strapi's other packages. Navigate back to the `strapi/app/` directory and once again run 

    npm install
    
Once the packages are installed, you can build Strapi by running

    npm run build

If you want to build Strapi to use a sqlite database for local development, build Strapi with the NODE_ENV environment variable set to local. This can be done at the same time as the build using the following command:

    cmd /V /C "set NODE_ENV=local&&npm run build"

To start Strapi in development mode, run 

    npm run develop

To start Strapi in production mode, run

    npm start

To start Strapi locally using the sqlite database, run either

    cmd /V /C "set NODE_ENV=local&&npm start"

or

    cmd /V /C "set NODE_ENV=local&&npm run develop"
    
## Adding a New Carousel

When Strapi is running for the first time, you'll need to create an admin user. You will be prompted for this automatically when you access the Strapi admin dashboard for the first time. 

After signing in as an admin user, you'll be brought to the admin dashboard. Under collection types in the left-hand menu, click Carousels. To add a new carousel, click the +Add New Carousel button on the right. Fill out all of the fields and upload images for each of the three banners in the carousel.

Once the fields are filled out and the images are uploaded, click save. This will save the carousel, and will put it in a draft state. To put the carousel into a production state, click the publish button. Clicking unpublish will put the banner back into a draft state.

## Enabling the Carousel API

When you have your first carousel that's ready to be viewed in the BCAHomepageClone or BCAHomepagePreview applications, you need to enable the API. Under General in the left-hand menu, click Settings. Under Users & Permissions Plugin in the settings menu, click Roles. Click the Public role, and you will be brought to the public role page. 

Scroll down to the Permissions section in the public role page. You will see the Carousel section under the Application heading. Check the checkboxes in the Carousel section beside count, find, and findone. Afterward, click the save button. Your API will now be available at the /Carousels path on Strapi. 