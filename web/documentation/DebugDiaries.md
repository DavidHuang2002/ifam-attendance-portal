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
