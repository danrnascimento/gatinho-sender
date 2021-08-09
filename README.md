# GatinhoSender

## Project to study clean architecture (-ish)

### Goal

Create a simple app to upload images and Should be able to have multiples styles and different implementations
but the presentation layer (react, styled components, etc) shouldn't know anything about the API communication, etc.

I need to create three different options to implement the upload API.

- Local Storage;
- Graphql;
- Rest API

I need to create three different options to upload the image or save the image link.

- A form with an upload button and a button to show the input to add the image URL.
- A form with an upload button and always shows the URL input.
- A form with an upload button only.

### Diagram

![diagram](./docs/diagram.png)

### To run the app

- start the api
  - Rest: `yarn start:rest`
  - Graphql: `yarn start:gql`
- Start the app
- Access `/` to use the Form one.
- Access `/two` to use the Form two.
- Access `/three` to use the Form three.
