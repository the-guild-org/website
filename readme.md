# [`the-guild.dev`](https://the-guild.dev)

This project contains the main source code for `the-guild.dev` website and it's sub-components.

## Installing Dependencies

Run `pnpm i` from the root directory to get all the dependencies installed.

## Running the Website (Development Mode)

Run `cd website && pnpm dev` to start the server locally.

## Build and Run the Website (Production)

Run `pnpm build` to build a static version of the website in production mode.

## Contributing to Our Blog

We use [MDX](https://mdxjs.com) (Markdown with JSX) for our blog posts. To add a new blog post:

- Create a new MDX file in `website/app/blog/(current-year)` directory with the same template as other blog posts
- Update the meta object with all the information regarding the blog post including title,
  thumbnails, author name, etc.
- Any assets related to the blog can be placed directly in your blog folder
  own folder
- If you are contributing for the first time, make sure that you add your details in `ui/authors.ts`
  file with a new entry to the `authors` object
- Once you send us a PR, we will review the same, provide the feedback as necessary and merge it if
  everything looks good
