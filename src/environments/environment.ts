/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    api: {
        /*dataApis: 'https://apirest.laboralsoft.com.mx/public/api',
        utcvApis: 'https://apirest.laboralsoft.com.mx/public/api',
        dataDownloads: 'https://apirest.laboralsoft.com.mx',
        CatalogsApis: 'https://apirest.laboralsoft.com.mx/public/api/catalogs',
        adminApis: 'https://apirest.laboralsoft.com.mx/public/api/manage/',
        templateApis: 'https://apirest.laboralsoft.com.mx/public/api/template/',
        standardApis: 'https://apirest.laboralsoft.com.mx/public/api/'*/

        /*
                dataApis: 'http://localhost/apirest/public/api',
                utcvApis: 'http://localhost/apirest/public/api',
                dataDownloads: 'http://localhost/app/',
                CatalogsApis: 'http://localhost/apirest/public/api/catalogs',
                adminApis: 'http://localhost/apirest/public/api/manage/',
                templateApis: 'http://localhost/apirest/public/api/template/',
                standardApis: 'http://localhost/apirest/public/api/'
                */


                dataApis: 'http://localhost:8000/api',
                utcvApis: 'http://localhost:8000/api',
                dataDownloads: 'http://localhost:8000/app/',
                CatalogsApis: 'http://localhost:8000/api/catalogs',
                adminApis: 'http://localhost:8000/api/manage/',
                templateApis: 'http://localhost:8000/api/template/',
                standardApis: 'http://localhost:8000/api/'


    },
};
