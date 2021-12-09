# the-guild.dev

## Installing Dependencies

Run `yarn` from the root directory to get all the dependencies installed

## Running the website (Development mode)

Run `yarn dev` to start the server locally with live reload setup

**Note:** Kindly ignore the warning regarding lqip when loading svg images. It is being tracked [here](https://github.com/cyrilwanner/next-optimized-images/issues/162)

## Build and run the website (Production)

Run `yarn build` followed by `yarn start` to run the website in production mode

## Contributing to our blog

We use [MDX](https://mdxjs.com/) (Markdown with JSX) for our blog posts. To add a new blog post,

- Create a new mdx file in `pages/blog` directory with the same template as other blog posts
- Update the meta object with all the information regarding the blog post including title, thumbnails, author name, etc.
- Any assets related to the blog can be placed in `public/blog-assets` directory within its own folder
- If you are contributing for the first time, make sure that you add your details in `ui/blog/authors.js` file with a new entry to the `authors` object.
- Once you send us a PR, we will review the same, provide the feedback as necessary and merge it if everything looks good.
