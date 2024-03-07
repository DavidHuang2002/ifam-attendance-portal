# Debug Diaries

Record all the trouble you debugged here with resources. Let's help each other out

## Display Next.js Image as Hero

solution:
https://www.perssondennis.com/articles/how-to-make-a-hero-image-in-nextjs

## Separate the admin portal from the rest

Initially tried with a spacer element, like

```
Menu mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1 }}>
    <Menu.Item key="1">Home Page</Menu.Item>
    <Menu.Item key="2">About Us</Menu.Item>
    <Menu.Item key="3">Events</Menu.Item>
    <div key="x" style={{ flexGrow: 1 }}></div> {/* Spacer element */}
    <Menu.Item key="4" >Admin Portal</Menu.Item>
</Menu>
```

But the spacer just wont appear in the order I set (it always appear before About Us) for some reason. But margin-left auto does the job

```
<Menu mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1 }}>
    <Menu.Item key="1">Home Page</Menu.Item>
    <Menu.Item key="2">About Us</Menu.Item>
    <Menu.Item key="3">Events</Menu.Item>
    <div style={{ flexGrow: 1 }}></div> {/* Spacer element */}
    <Menu.Item key="4" style={{ marginLeft: 'auto' }}>Admin Portal</Menu.Item>
</Menu>
```

Why?
Here's what margin-left: auto does in different contexts:

Non-Flexbox Context: In a standard block formatting context (not flexbox or grid), setting margin-left: auto on an element will cause it to shift to the right as far as possible within its container. This is often used to horizontally center an element within its parent when margin-right: auto is also applied. If only margin-left: auto is used, it effectively aligns the element to the right.

Flexbox Context: In a flex container, margin-left: auto will absorb any extra space on the left side of the element, pushing the element to the right within the flex container. This can be used to separate a flex item from its peers and push it to the far right edge of the flex container.

## Firebase API

conflicting APIs from different versions
There are so many ways to do the same thing. I was looking at a tutorial but the code just wont work on this project
Turns out the API I was try to call was from an old version
https://www.reddit.com/r/Firebase/comments/vp8ugv/error_dbcollection_is_not_a_function/

## Jest doesnt recogniza import with @

```
  src/__tests__/landingPage.test.jsx
  ● Test suite failed to run

    Cannot find module '@/components/mainPage/HeroSection' from 'src/app/page.js'
```

Solved by following this answer:
https://stackoverflow.com/questions/55400845/jest-cant-resolve-import-with-at-character

But instead of putting in package.json, our configuration has to be in jest.config.js

## Firebase inconsistency

FirebaseError: Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore
https://stackoverflow.com/questions/69047904/how-to-solve-firebaseerror-expected-first-argument-to-collection-to-be-a-coll

Found out I imported from teh wrong firebase in my config

## Invalid Status code 0

```
⨯ RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: 0
    at ServerResponse.writeHead (node:_http_server:352:11)
    at ServerResponse.writeHead (/Users/davidhuang/Desktop/Project/ifam-attendance-portal/web/node_modules/next/dist/compiled/compression/index.js:46:263)
    at ServerResponse._implicitHeader (node:_http_server:338:8)
    at ServerResponse.end (/Users/davidhuang/Desktop/Project/ifam-attendance-portal/web/node_modules/next/dist/compiled/compression/index.js:22:749)
    at sendResponse (/Users/davidhuang/Desktop/Project/ifam-attendance-portal/web/node_modules/next/dist/server/send-response.js:42:30)
    at doRender (/Users/davidhuang/Desktop/Project/ifam-attendance-portal/web/node_modules/next/dist/server/base-server.js:1363:62)
    at async cacheEntry.responseCache.get.routeKind (/Users/davidhuang/Desktop/Project/ifam-attendance-portal/web/node_modules/next/dist/server/base-server.js:1555:28)
    at async DevServer.renderToResponseWithComponentsImpl (/Users/davidhuang/Desktop/Project/ifam-attendance-portal/web/node_modules/next/dist/server/base-server.js:1463:28)
    at async DevServer.renderPageComponent (/Users/davidhuang/Desktop/Project/ifam-attendance-portal/web/node_modules/next/dist/server/base-server.js:1856:24)
    at async DevServer.renderToResponseImpl (/Users/davidhuang/Desktop/Project/ifam-attendance-portal/web/node_modules/next/dist/server/base-server.js:1894:32)
    at async DevServer.pipeImpl (/Users/davidhuang/Desktop/Project/ifam-attendance-portal/web/node_modules/next/dist/server/base-server.js:911:25)
    at async NextNodeServer.handleCatchallRenderRequest (/Users/davidhuang/Desktop/Project/ifam-attendance-portal/web/node_modules/next/dist/server/next-server.js:271:17)
    at async DevServer.handleRequestImpl (/Users/davidhuang/Desktop/Project/ifam-attendance-portal/web/node_modules/next/dist/server/base-server.js:807:17)
    at async /Users/davidhuang/Desktop/Project/ifam-attendance-portal/web/node_modules/next/dist/server/dev/next-dev-server.js:331:20
    at async Span.traceAsyncFn (/Users/davidhuang/Desktop/Project/ifam-attendance-portal/web/node_modules/next/dist/trace/trace.js:151:20)
    at async DevServer.handleRequest (/Users/davidhuang/Desktop/Project/ifam-attendance-portal/web/node_modules/next/dist/server/dev/next-dev-server.js:328:24)
    at async invokeRender (/Users/davidhuang/Desktop/Project/ifam-attendance-portal/web/node_modules/next/dist/server/lib/router-server.js:163:21)
    at async handleRequest (/Users/davidhuang/Desktop/Project/ifam-attendance-portal/web/node_modules/next/dist/server/lib/router-server.js:342:24)
    at async requestHandlerImpl (/Users/davidhuang/Desktop/Project/ifam-attendance-portal/web/node_modules/next/dist/server/lib/router-server.js:366:13)
    at async Server.requestListener (/Users/davidhuang/Desktop/Project/ifam-attendance-portal/web/node_modules/next/dist/server/lib/start-server.js:140:13) {
  code: 'ERR_HTTP_INVALID_STATUS_CODE'
```

Reasons: the db for firebase is null because I imported it from the wrong place.
