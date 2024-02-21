If you are encountering weird bugs with using Ant Design in your page like the following:

```
Error: Could not find the module "/Users/davidhuang/Desktop/Project/antd-demo/node_modules/antd/es/index.js@__barrel_optimize__?names=Breadcrumb,Layout,Menu,theme#Layout#Header" in the React Client Manifest. This is probably a bug in the React Server Components bundler.
```

Put "use client;" on the very top of your file and try again
