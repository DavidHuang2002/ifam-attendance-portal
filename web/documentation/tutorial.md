## Coding Style

Extract logic into small components. The file should never be too long. The component for a page should be in directory appropriately named after that page.

Add comments whenever you think is possibility for confusion

## Workflow

Everytime you are tasked with a development. Create a new branch, work on it and make pull request when you are done.

If you are unfaimilar with git. Go download Github Desktop. It will make your life easier.

## Backend development

### examples
See these files for examples of how to work with API and database:

- [how to query backend in your page](../src/app/admin/test/page.js)
    - This file show an example button that creates new attendance record when clicked
- [how to define API methods that interact with database](../src/app/api/attendance/route.js)
    - this file shows an example API that deals with attendacne 
    - in the route.js file, you can see I am mainly just defining API endpoints and "forwards" logic with querying/creating actual record in databse to the helper methods in service file

## Note on possible common problem

If you are encountering weird bugs with using Ant Design in your page like the following:

```
Error: Could not find the module "/Users/davidhuang/Desktop/Project/antd-demo/node_modules/antd/es/index.js@__barrel_optimize__?names=Breadcrumb,Layout,Menu,theme#Layout#Header" in the React Client Manifest. This is probably a bug in the React Server Components bundler.
```

Put "use client;" on the very top of your file and try again
