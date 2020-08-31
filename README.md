## UX Developer Intern & Web Developer Intern Challenge - Winter 2021
You can see the original requirements for this project [here](https://docs.google.com/document/d/1AZO0BZwn1Aogj4f3PDNe1mhq8pKsXZxtrG--EIbP_-w/edit#heading=h.31w9woubunro).

This project was bootstrapped with [**Create React App**](https://github.com/facebook/create-react-app), and uses [**React**](https://github.com/facebook/react), [**TypeScript**](https://github.com/microsoft/TypeScript), [**Apollo Client**](https://github.com/apollographql/apollo-client), and [**Bootstrap**](https://github.com/twbs/bootstrap). 

## The Challenge
> We need a webpage that can search OMDB for movies, and allow the user to save their favourite films they feel should be up for nomination. When they've selected 5 nominees they should be notified they're finished.
>
> We'd like a simple to use interface that makes it easy to:
> - Search OMDB and display the results (movies only)
> - Add a movie from the search results to our nomination list
> - View the list of films already nominated
> - Remove a nominee from the nomination list

## My solution
This challenge was perfectly suited to using a library like **React**. The different components and their interactions were very well defined. You really only need 5 components:
- **Search bar**: Handles user input, and sends the queries to the OMDB API.
- **Results list**: Displays the result of the query, and allows the user to nominate a movie.
- **Nomination list**: Displays the nominated movies, and allows the user to remove a movie's nomiation.
- **Banner**: Informs the user when 5 movies have been nominated.
- **Controller**: Orchestrates the interactions between the different components, and stores the shared states.

To obtain a decent looking website quickly, I used **Bootstrap**. I personally really like the look of Bootstrap, even if its popularity has the undesired side effect of making  websites that use it look generic.

**TypeScript** and **Apollo Client** were really not necessary for this project, but both are great new tools that are likely to redefine the future of web development. They are also both used at Shopify. This project was a good opportunity for me to further practice using these tools.

## Available Scripts

In the project directory, you can run:

```npm start```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

```npm run build```

Builds the app for production to the `build` folder.<br />

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
