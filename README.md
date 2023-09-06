# About The Project

This project is a German web application developed for a research project Artificial Intelligence Controlled Milling (AICoM). The app is used for inspection of components.

Visit the link for more info about the research project: [AICoM](https://lernendewerkzeugmaschine.de/)

## Screenshots

Homepage  
![image](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/1c5a4b12-71ed-44d2-8025-6653c5dc061f)

On every webpage of the app, there are a home button on the top right of the page. By clicking it, it goes to the homepage. On the homepage, there are two buttons "Bauteilprüfung" (inspection of a component) and "Serialnummer anfordern" (create a serial number). The first button "Bauteilprüfung" is used to inspect a component. By clicking it, users are directed to the first page.

First page  
![grafik](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/ece2ebc1-a8c5-48b3-b257-90729ca1ed38)

Users have to choose an inspection number and a serial number of the component, and click "Anlegen" to create a measurement. Now on the second page, the app will show all the measurement features saved in DB.

Second page  
![grafik](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/7effe5e1-7f99-4de4-945d-874485a1e117)

Users can click the button "Zeichnung öffnen" (open drawing) to see the picture of the component. In this page, users are required to fill in the "IST-Wert" (actual value) for each feature.  
The app evaluates automatically the input actual value by checking if it is within the "Max." (maximum value) and "Min." (minimum value).  
If it is within the range, the column "Bewertung" (evaluation) shows "i.O" (okay). If it is not within the range, "n.i.O" (not okay) is shown and the row is red.  
Users can then click "Speichern" (save) to save the measurement data. After clicking save, it goes to the final page. Users can also click the button "Zurück" (back) to go back to the previous page.

Final page
![grafik](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/196c1828-69a1-42cd-9eff-f3e6beb793d7)

The final page shows the evaluated measurement results. Users can click "Schließen" (close) to go back to homepage to create another measurement

Homepage  
![image](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/1c5a4b12-71ed-44d2-8025-6653c5dc061f)

On the homepage, the second button "Serialnummer anfordern" is used to create a new serial number for a component. Click it.

![grafik](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/c9332a95-5cfc-46ea-ab59-41d3cfd65fd0)

After clicking it, users are directed to the page to choose the components that needs a serial number. Then, click on "Anlegen" (create) to create a new serial number.

![image](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/36443008-8511-4562-96f7-3340366fe98d)

The app shows a message box that a new serial number XXX is created.

## Table of Contents

- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Environment Setup](#environment-setup)
- [Project Structure](#project-structure)
- [User Interface](#user-interface)
- [Data Management](#data-management)
- [Styling](#styling)
- [Troubleshooting](#troubleshooting)
- [ESLint and Prettier Setup](#eslint-and-prettier-setup)
- [Resources](#resources)
- [Contact](#contact)

## Getting Started

This app is sharing the same DB with Gühring Tool Management Software (GTMS). GTMS is used to maintain the details and tolerance of the measurement of components.

1. Refer to the user manual "Bauteilpruefung_GTMS-Anleitung" for a step by step guide to maintain the prerequisite measurement features and their tolerances in GTMS. The manual is in the folder D:\GTMS\Batueilpruefung.

2. User can see the app on the following URL: http://localhost:7000/menu

## Technologies Used

- [React](https://reactjs.org/docs/getting-started.html)
- JavaScript
- [Styled-components for styling](https://styled-components.com/docs)

## Environment Setup

- [Node.js (version 18.15.0 or higher)](https://nodejs.org/en)

## Project Structure

├── node_modules/ # Dependencies  
├── public/  
│ ├── pictures/ # All the pictures used in the app such as logo, home button and components for inspection  
│ ├── index.html  
├── src/  
│ ├── components/  
│ │ ├── Header/  
│ │ │ ├── Header.js # Header with title of the app and home button  
│ │ │ ├── index.js  
│ │ ├── Image/  
│ │ │ ├── ImageModal.js # Image enlargement upon image click. It is used in the Results page  
│ │ │ ├── index.js  
│ │ ├── Table/  
│ │ │ ├── SelectRow.js # Selection of "i.O" (okay) or "n.i.O" (not okay) for the column "Bewertung" (evaluation) in each row of a table. If the measurement feature of a row has no value input, then these selections are provided and shown in the row of the table.  
│ │ │ ├── TableAuftragPruefdaten.js # This is the table shown in final page. Tt shows all the measurement data of the inspection of a component done by users.  
│ │ │ ├── TableAuftragPruefpositionen.js # This is the table shown in second page. It shows all the measurement features of the inspected component. Users have to fill in the "IST-Wert" (actual value) in this table.  
│ │ ├── UI/ # Styling of common UI components using styled-components  
│ │ │ ├── Button.js # There are three styles of button: small, medium and big  
│ │ │ ├── NumberInput.js  
│ │ │ ├── SelectMenu.js  
│ │ │ ├── Table.js  
│ │ │ ├── TextInput.js  
│ ├── layouts/  
│ │ ├── Layout.js # Standard layout for every page  
│ ├── pages/  
│ │ ├── Bauteilpruefung/  
│ │ │ ├── Bauteilpruefung.js # First page of first function for selecting an inspection number and a serial number  
│ │ │ ├── index.js  
│ │ ├── Finalpage/  
│ │ │ ├── Finalpage.js # Final page of first function to show the saved evaluated results  
│ │ │ ├── index.js  
│ │ ├── Menu/  
│ │ │ ├── Menu.js # Homepage with two functions: Inspect a component and create serial number  
│ │ │ ├── index.js  
│ │ ├── Results/  
│ │ │ ├── Results.js # Second page of first function for input measurements and it shows the evaluated results immediately  
│ │ │ ├── index.js  
│ │ ├── Serialnummer/  
│ │ │ ├── Serialnummer.js # Second function for assigning a new serial number  
│ │ │ ├── index.js  
│ ├── App.js # App main component  
│ ├── index.css # Standard CSS styling for app  
│ ├── index.js # Entry point of app  
├── .env.local # Sensitive credentials  
├── .eslintrc.js # Static code analysis tool  
├── .gitignore # Ignore files or folders in Git  
├── .prettierrc.json # Code formatter  
├── jsconfig.json # JavaScript language service  
├── package-lock.json # Generated by npm when installing packages  
├── package.json # npm dependencies and run scripts  
├── README.md # Documentation

## User Interface

This app consists of the following main UI components:

- Header: Header with home button.
- Image: Image enlargement upon component click: A user interface feature or interaction where an image associated with a specific component enlarges or magnifies when the user clicks on (or taps, in touch interfaces) that component.
- Table: Table for users to input measurement. It contains the measurement details such as "Prüfplan" (inspection number), "Serialnr." (serial number), "Position" (position), "Formelement" (process number), "Messmittel" (measuring tools), "Min." (minimum value), "Max." (maximum value), "Soll" (desired value), "IST-Wert" (actual value), "Bewertung" (evaluation) and "Bemerkung" (remark).
- UI: Styling for common UI components Button, Select Input, Number Input, Text Input and Table

## Data Management

Data is fetched from a backend API using Fetch API and displayed in the UI components.

## Styling

Styling is done using [styled-components](https://styled-components.com/docs/basics#installation). It utilises tagged template literals to style the components.

This is an example from styled-components docs. It creates two simple components, a wrapper and a title, with some styles attached to it:

```js
// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

// Use Title and Wrapper like any other React component – except they're styled!
render(
  <Wrapper>
    <Title>Hello World!</Title>
  </Wrapper>
);
```

## Troubleshooting

If you encounter any issues, try the following:

- Restart the backend API "AICoM Bauteilpruefung Backend API" at Windows Task Scheduler.

For more support, please contact software developer [Xiang Yi Kiong](xiangyi.kiong@guehring.de).

## ESLint and Prettier Setup

[ESLint](https://eslint.org/docs/latest/use/configure/configuration-files) is a static code analysis tool for identifying problematic patterns found in JavaScript code.

You can configure ESLint via .eslintrc.js file. It is in the root directory of this project.

[Prettier](https://prettier.io/docs/en/configuration.html) is an opinionated code formatter.

You can configure Prettier via .prettierrc.json file. It is in the root directory of this project.

## Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Styled-components Documentation](https://styled-components.com/docs)

## Contact

[Xiang Yi Kiong](xiangyi.kiong@guehring.de)
