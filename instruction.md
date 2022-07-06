# Instructions

Here are some instructions explaining how I developed this project.

## Create Project
Create by Vue CLI
`vue create ur_house_ui`

- Set options to include `vue-router` and `vuex`,
- Set eslint, using prettier. (other options are airbnb and standard)

    [prettier is popular in recent years](https://npmtrends.com/eslint-config-airbnb-vs-prettier-vs-standard)

## Packages
Installed some useful packages
- `lodash`: Useful javascript library for many situations, like filtering, and comparisons, to save your time rebuilding the wheels.
- `axios`: Requesting API.
- `js-cookie`: Simple javascript library to manipulate cookies.
- `element-ui`: One of the most common UI frameworks for Vue.js.


## Base URL

To send requests to the server which is a different domain, 
We can privilege environmental variables
Create a  `.env` file to set environment variables, and **Must** prefix them with `VUE_APP` 

For example,

```javascript
VUE_APP_REMOTE_URL=http://localhost:3000
```

In Vue components, use ` process.env.VUE_APP_REMOTE_URL` to get the value.

For the use case, see `ResidenceItem.vue`, it set the base URL to the image URL to get the image from the server.

## Request Setting

axios let us set before the action of request and response, this feature calls `interceptors`

We can set the base URL, add JWT to the header in the request's interceptors,  
As well as handling 401 status to redirect to the signin page.

And We can do more about that. This just current settings and we can add functions whenever we want.

see `src/utils/request.js`

## Authentication

In `request.js`,

set into request interceptors:

```javascript
config.headers.Authorization = `Bearer ${Cookies.get("jwt")}`;
```

## Route

`vue-router` provide router feature,

A notable feature is the router guard.

We need to make sure that the user is logged in before entering an authenticated page.

For example,

```javascript
# store is get from vuex, which is the
router.beforeEach(async (to, from, next) => {
  if (
    // make sure the user is authenticated
    !store.getters.isLogin &&
    to.name !== "signin" &&
    to.name !== "signup"
  ) {
    next({ name: "signin" });
  } else next();
});
```

See `src/router/index`

## State Management

`vuex` is for state management

In vuex:  

- `state` is the state
- `getter` is for wrapping state into certain functions to desired result.  
- `mutations` is for setting `state`
- `actions` is more complicated, it can be used to trigger `mutation` (by calling `commit`), and it can run asynchronously.  
In actions, we can await APIs, then set response data to state using commit.

For more reference, see the [documentation](https://vuex.vuejs.org/guide/index.html)

See `src/store/index`
