# About The Project

This project is a German web application developed for a research project Artificial Intelligence Controlled Milling (AICoM). The app is used for inspection of components in metalworking process for the manufacturing industry.

Visit this link for more info about the research project: [AICoM](https://lernendewerkzeugmaschine.de/)

## Application Flow 1

First function: Inspection of a component (Bauteilprüfung)

### Homepage

![image](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/1c5a4b12-71ed-44d2-8025-6653c5dc061f)

On every webpage of the app, there are a home button on the top right of the page. By clicking it, it goes to the homepage. On the homepage, there are two buttons "Bauteilprüfung" (inspection of a component) and "Serialnummer anfordern" (create a serial number). The first button "Bauteilprüfung" is used to inspect a component. By clicking it, users are directed to the first page.

### First page - Selection of Inspection Number and Serial Number

![grafik](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/ece2ebc1-a8c5-48b3-b257-90729ca1ed38)

Users have to choose an inspection number and a serial number of the component, and click "Anlegen" to create a measurement. Now on the second page, the app will show all the measurement features saved in DB.

### Second page - Input Actual Value for Measurement Features

![grafik](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/7effe5e1-7f99-4de4-945d-874485a1e117)

Users can click the button "Zeichnung öffnen" to see the image of the component. In this page, users are required to fill in the "IST-Wert" (actual value) for each feature.  
The app evaluates automatically the input actual value by checking whether it is within the "Max." (maximum value) and "Min." (minimum value).  
If it is within the range, the column "Bewertung" (evaluation) shows "i.O" (okay). If it is not within the range, "n.i.O" (not okay) is shown and the row is red. Users can also input remarks in the column "Bemerkung".
Users can then click "Speichern" to save the measurement data. After clicking save, it goes to the final page. Or users can also click the button "Zurück" to go back to the previous page.

### Final page - Presentation of Measurement Results

![grafik](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/196c1828-69a1-42cd-9eff-f3e6beb793d7)

The final page shows the evaluated measurement results. Users can click "Schließen" to close it and users are directed to homepage and can create another measurement.

## Application Flow 2

Second function: Create a serial number

Homepage  
![image](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/1c5a4b12-71ed-44d2-8025-6653c5dc061f)

On the homepage, the second button "Serialnummer anfordern" is used to create a new serial number for a component.

![grafik](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/c9332a95-5cfc-46ea-ab59-41d3cfd65fd0)

After clicking it, users are directed to the next page to choose the components that needs a serial number. After selection, click on "Anlegen" to create a new serial number.

![image](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/36443008-8511-4562-96f7-3340366fe98d)

The app shows a message box that a new serial number XXX was created.

## Table of Contents

- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Environment Setup](#environment-setup)
- [ESLint and Prettier Setup](#eslint-and-prettier-setup)
- [Project Structure](#project-structure)
- [User Interface](#user-interface)
- [Data Management](#data-management)
- [Styling](#styling)
- [Troubleshooting](#troubleshooting)
- [Resources](#resources)
- [Contact](#contact)

## Getting Started

This app is sharing the same database (DB) with [Gühring Tool Management Software](https://guehring.com/en/service/digital-services/gtms/) (GTMS). First of all, users have to maintain the data of measurement features and tolerance of the components using GTMS.

To use this app:

1. Refer to the user manual "Bauteilpruefung_GTMS-Anleitung" in the folder D:\GTMS\Batueilpruefung for a step by step guide to save the prerequisite measurement features and their tolerances in GTMS.

2. Users can see the app on the following URL: http://localhost:7000/menu

## Technologies Used

- [React](https://reactjs.org/docs/getting-started.html)
- JavaScript
- [Styled-components for styling](https://styled-components.com/docs)

## Environment Setup

- Node.js (version 18.15.0 or higher)
  - Download and run the installer from [NodeJS WebSite](https://nodejs.org/en).

## ESLint and Prettier Setup

[ESLint](https://eslint.org) is a static code analysis tool for identifying problematic patterns found in JavaScript code.

- Install ESLint locally according to [ESLint Website](https://eslint.org/docs/latest/use/getting-started):  
  `npm init @eslint/config`
- Then, configure ESLint via .eslintrc.js file.
- Refer to the [Configure ESLint documentation](https://eslint.org/docs/latest/use/configure/) to learn how to add rules, environments, custom configurations, plugins, and more.

[Prettier](https://prettier.io) is an opinionated code formatter.

- Install Prettier locally accroding to [Prettier Website](https://prettier.io/docs/en/install.html):  
  `npm install --save-dev --save-exact prettier`
- Then, configure Prettier via .prettierrc.json file to let editors and other tools know you are using Prettier.
- Refer to the [Configuration File documentation](https://prettier.io/docs/en/configuration.html) to learn more.

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
│ │ │ ├── ImageModal.js # Image enlargement upon image click. It is used in the second page of the app (Results.js)  
│ │ │ ├── index.js  
│ │ ├── Table/  
│ │ │ ├── SelectRow.js # Selection of "i.O" (okay) or "n.i.O" (not okay) for the column "Bewertung" (evaluation) in each row of the table in second page. If the measurement feature of a row has no value input, then these selections are active and shown in the row for users to select.  
│ │ │ ├── TableAuftragPruefdaten.js # This is the table shown in final page. It shows all the evaluated measurement data of the inspection of a component done by users.  
│ │ │ ├── TableAuftragPruefpositionen.js # This is the table shown in second page. It shows all the measurement features of the inspected component. Users have to fill in the "IST-Wert" (actual value) in this table.  
│ │ ├── UI/ # Styling of common UI components using styled-components  
│ │ │ ├── Button.js # Styles of buttons: small, medium and big  
│ │ │ ├── NumberInput.js # Number input for "IST-Wert" (actual value) column in the table of the second page  
│ │ │ ├── SelectMenu.js # Select menu in the first page to choose inspection number and serial number or to choose component when creating serial number  
│ │ │ ├── Table.js # Table styling for second page and final page  
│ │ │ ├── TextInput.js # Text input for "Bemerkung" (remark) colum in the table of the second page  
│ ├── layouts/  
│ │ ├── Layout.js # Standard layout for every page  
│ ├── pages/  
│ │ ├── Bauteilpruefung/  
│ │ │ ├── Bauteilpruefung.js # First page for selecting an inspection number and a serial number for inspection of a component  
│ │ │ ├── index.js  
│ │ ├── Finalpage/  
│ │ │ ├── Finalpage.js # Final page to show the saved evaluated measurement results  
│ │ │ ├── index.js  
│ │ ├── Menu/  
│ │ │ ├── Menu.js # Homepage with two buttons with the functions: 1. Inspect a component, 2. Create a serial number  
│ │ │ ├── index.js  
│ │ ├── Results/  
│ │ │ ├── Results.js # Second page for input measurements and every row shows the evaluated results immediately  
│ │ │ ├── index.js  
│ │ ├── Serialnummer/  
│ │ │ ├── Serialnummer.js # The page after clicking the second button on homepage for creating a new serial number  
│ │ │ ├── index.js  
│ ├── .env.local # Configuration option for Backend API PORT  
│ ├── App.js # App main component  
│ ├── index.css # Standard CSS styling for app  
│ ├── index.js # Entry point of app  
├── .eslintrc.js # Static code analysis tool  
├── .gitignore # Ignore files or folders in Git  
├── .prettierrc.json # Code formatter  
├── README.md # Documentation  
├── jsconfig.json # JavaScript language service  
├── package-lock.json # Generated by npm when installing packages  
├── package.json # npm dependencies and run scripts

## User Interface

This app consists of the following main UI components:

- Header: Header with home button on every page.
- Image: Image enlargement upon component click for the button "Zeichnung öffnen" in the second page: A user interface feature or interaction where an image associated with a specific component enlarges or magnifies when the user clicks on (or taps, in touch interfaces) that component.
- Table: Table for users to input measurement and remarks in the second page and show evaluated measurement results in the final page. It contains the measurement details such as "Prüfplan" (inspection number), "Serialnr." (serial number), "Position" (position), "Formelement" (process number), "Messmittel" (measuring tools), "Min." (minimum value), "Max." (maximum value), "Soll" (desired value), "IST-Wert" (actual value), "Bewertung" (evaluation) and "Bemerkung" (remark).
- UI: Styling for common UI components such as Button, Select Input, Number Input, Text Input and Table

## Data Management

Data is fetched from a backend API using Fetch API and displayed in the UI components.

1. Fetch Measurement Features

   - URL: http://localhost:5000/AuftragPruefpositionen/:selectedPruefplannummer
   - Method: GET
   - URL Parameters:
     - selectedPruefplannummer (required): The inspection number
   - Success Response:

     - Code: 200 OK
     - Content:
       - json
         ```json
         {
           "ID": 17,
           "Pruefplannummer": 1001,
           "Position": 1,
           "Positionstext": "1_1_1",
           "Artikel": "6793",
           "Bezeichnung": "45H7 (+0.025)",
           "MinWert": "45,7",
           "MaxWert": "45,725",
           "Sollwert": "45,7",
           "Endkontrolle": false,
           "KeineWerteingabe": false,
           "Zusatztext1": "Innenmessschraube",
           "Zusatztext2": "",
           "Zusatztext3": "",
           "Zusatztext4": "",
           "Zusatztext5": ""
         }
         ```

   - Error Responses: - Code: 500 Internal Server Error
     - Content:
       - json
         ```json
         {
           "error": "Error Message"
         }
         ```

## Styling

Styling is done using [styled-components](https://styled-components.com/docs/basics#installation). It utilises tagged template literals to style the components.

Below is an example from styled-components docs. It creates two simple components, a wrapper and a title, with some styles attached to it:

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

## Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Styled-components Documentation](https://styled-components.com/docs)

## Contact

[Xiang Yi Kiong](xiangyi.kiong@guehring.de)
