# Frontend Training

Welcome to the Frontend Training! This project is designed to help you learn the latest technologies in frontend web development. You will be working with GraphQL (Apollo Client), ReactJS, Typescript, Styled Components, and many more tools to create a cutting-edge web application.

## Getting Started
To get started, you'll need to clone this repository to your local machine and run npm install to install the required dependencies.

```bash
git clone git@gitlab.com:siriussystem/training/frontend_training.git
cd frontend-training
npm install
npm start
```

## Technologies and concepts
The project covers the following technologies and concepts:

- ReactJS
- Graphql (Apollo Client)
- Functional components and Hooks
- Typescript
- Styled Components
- Pixel Perfect design
- Light + Dark Theme support
- Web Responsiveness
- Performance optimization (useCallback, useMemo)
- Error handling
- Translations (i18n)
- Deployment
- Environment variables
- Linter (ESLint)
- Code formatter (Prettier)
- Git Flow
- Git best practices
- Actions pre-commit
- Component documentation with Storybook
- Component testing with Jest
- TSDoc
- Gitlab CI/CD
- i18n

## The project

The project consists of building a Twitter clone using ReactJS and integrating it with a previously implemented [backend application](https://gitlab.com/siriussystem/training/backend-training). The backend application is an API similar to Twitter and includes features like user follow/unfollow, private profiles, cursor-based pagination, post reactions, comments, user profile pictures, real-time chat, and more. The frontend program will utilize the following technologies and concepts: Graphql (Apollo Client), ReactJS, functional components and hooks, TypeScript, styled components, responsive web design, performance optimization, error handling, i18n translations, deployment, env variables, linter, prettier, Git flow, Git good practices, Actions pre-commit, Storybook, and component testing.

The backend endpoints will be utilized wherever necessary to communicate with the backend API and implement the various features of the Twitter clone. The project will result in a complete Twitter clone that utilizes the latest frontend technologies and follows best practices for performance, maintainability, and scalability.

## Tasks

- [ ] **Prettier**: Add and configure Prettier using Typescript and React standards.

- [ ] **Register screen**: Create a register screen. User should provide the following information:
  - ***Email***: String. Check isEmail with [Validator](https://www.npmjs.com/package/validator).
  - ***Username***: String.
  - ***Password***: String. Check isStrongPassword with [Validator](https://www.npmjs.com/package/validator).
  - ***Name***: String.

    Use ```POST api/auth/signup```

- [ ] **Login screen**: Create a login screen, that works as entry point to the application. User should provide the following information:
  - ***Username***: String. (Optional).
  - ***Email***: String. (Optional).
  - ***Password***: String.

  Either email or username should be provided. Use ```POST api/auth/login```

- [ ] **Integrate S3**: Create a helper class that provides generic functions to upload images to S3.

- [ ] **Tweet**: After logging in, user should be able to post. Posts should contain:
  - ***Content***: String with 1 to 240 characters.
  - ***Images***: Array with 0-4 image URLs. (Optional). Let user upload images to S3 and use generated links.

  Use ```POST api/post```. After posting, user should see their post without having to refresh the page (This can be done in the **Feed** task). 

- [ ] **Delete post**: User should be able to delete their own posts. Use ```DELETE api/post/:post_id```.

- [ ] **Profile**: After clicking on profile image (if no image -> default to avatar with initials), user should navigate to their profile. Here, they should see:
  - ***Name***
  - ***Username***
  - ***Posts***

  Use ```GET api/user/me``` and ```GET api/post/by_user/:user_id```.

- [ ] **Delete user**: Add a button "Delete" that lets users delete their accounts. There should be a confirmation modal. After deleting the account, user should be redirected to the login screen. Use ```DELETE api/user```.

- [ ] **Search user**: Add a search bar that lets user search other users by username, and displays options with:
  - ***Name***
  - ***Username***
  - ***Profile image***: Default to avatar with initials.

  Use ```GET api/user/by_username```. Users list should have infinite scroll.

- [ ] **User profile**: After finding and clicking on a user, user should be redirected to the other users profile screen. This screen should display:
  - ***Name***
  - ***Username***
  - ***Posts***: Only if profile is public or current user follows this user. If not, show a message "User has a private account".

  Use ```GET api/user/:user_id ```. Reuse own profile's screen. 

- [ ] **Follow user**: Add a "Follow" button to other users profile screen. Use ```POST /api/follower/follow/:user_id```. Should only display if user isn't currently following the other user.

- [ ] **Unfollow user**: Add an "Unfollow" button to other users profile screen. Use ```POST /api/follow/unfollow/:user_id```. Should only display if user is currently following the other user. After unfollowing, posts should hide if other user's account is private, without having to refresh.

- [ ] **Feed**: Create a posts feed, which should work as the "Home" screen. Here, the logged users should see posts from themselves and from followed users. Posts should show:
  - ***Content***
  - ***Images***: If existent.

  Profile screen should use the same UI component as the feed.
  Use ```GET api/post```. Use infinite scroll.

- [ ] **React to post**: Add reactions (like and repost) to posts, both in profile screens and feed. Use ```POST api/reaction/:post_id``` to add a reaction and ```DELETE api/reaction/:post_id``` to delete it.

- [ ] **Comment post**: Add a button to comment a post. The comment should have:
  - ***Content***: String with 1 to 240 characters.
  - ***Images***: Array with 0-4 image URLs. (Optional). Let user upload images to S3 and use generated links.
  
  Reuse post component to create a new comment.
  Use the endpoint created in the backend.

- [ ] **Display comments and reactions in posts**: Display the number of comments, likes and reposts for each post. Also, display a list of comments under each post (after clicking on it), with infinite scroll.

- [ ] **User recommendations**: Add a list of users recommended on the right side of the feed. Show only first 4 recommended users, with:
  - ***Name***
  - ***Username***
  - ***Profile picture***: Default to avatar with initials.
  - ***Follow button***: After clicking on follow, user should disappear from the list, and the next recommended user should appear.

  Under the last user, there should be a "See more" button, which redirects the user to a screen with recommended users, with infinite scroll.
  Use ```GET api/user```.

- [ ] **Chat**: Create a chat screen, where user should be able to create a new real-time chat and see the history of chats. After creating/opening a chat, user should first see previous messages (if existent) and then have the ability to chat in real time. Use SocketIO.

- [ ] **Light/Dark theme**: Add the ability to toggle between light and dark theme.

- [ ] **Translations**: Add the ability to toggle between english and spanish (use i18n).

- [ ] **Documentation**: Document all components using TSDoc and Storybook.

- [ ] **Testing**: Test all components using Jest.

- [ ] **CI/CD**: Make a Gitlab CI/CD pipeline that runs all the tests and requires all the tests to pass in order to merge a branch into main (after creating an MR).

## General considerations

- Styling should be achieved using Styled Components
- The application should adjust to Figma designs, carefully respecting the percentages and sizes (Pixel perfect)
- The application should be responsive:
  - Mobile: 360×640 - 414×896
  - Tablet: 601×962 - 1280×800
  - Desktop: 1024×768 - 1920×1080
- The app should handle errors:
  - If error doesn't block the application's lifecycle, then show screen's error state (if designed) or a toast (if not designed).
  - If error blocks the user from using the application, redirect to a default screen with an option to report the error (Use [ErrorBoundary](https://www.npmjs.com/package/react-error-boundary)).
- Use environment variables to hide keys and application environment (development/production).
- Use Git Flow as branching strategy.
- Use [Git best practices](https://gist.github.com/luismts/495d982e8c5b1a0ced4a57cf3d93cf60).
- Use functional components and hooks.
- Do as much performance optimization as you can.

## Resources

Here are some resources you may find helpful as you work through the project:

- [ReactJS](https://reactjs.org/docs/getting-started.html)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Typescript](https://www.typescriptlang.org/docs/)
- [Styled Components](https://styled-components.com/docs)
- [ESLint](https://eslint.org/docs/latest/use/getting-started)
- [Prettier](https://prettier.io/docs/en/index.html)
- [Git Flow](https://datasift.github.io/gitflow/IntroducingGitFlow.html)
- [TSDoc](https://tsdoc.org/)
- [Storybook](https://storybook.js.org/docs/react/get-started/introduction)
- [Jest](https://jestjs.io/docs/getting-started)
- [Gitlab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/)
- [i18n](https://www.i18next.com/)

## Support

If you have any questions or run into any issues, feel free to reach out for support. You can open an issue in this repository, or find us on [Slack](https://siriuspilar-sf.slack.com/archives/C04NLAUA7KK).

Happy coding!
