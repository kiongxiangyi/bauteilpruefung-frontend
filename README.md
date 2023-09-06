# About The Project

This project is a web application developed for a research project AICoM. It is used for inspection of components.

On every webpage of the app, there are a home button on the top right of the page. By clicking it, it goes to the homepage. On the homepage, there are two buttons "Bauteilprüfung" (inspectin of a component) and "Serialnummer anfordern" (create a serial number).

Homepage  
![image](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/1c5a4b12-71ed-44d2-8025-6653c5dc061f)

The first button "Bauteilprüfung" is used to inspect a component. By clicking it, users are directed to the first page.

First page  
![grafik](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/ece2ebc1-a8c5-48b3-b257-90729ca1ed38)

Users have to choose an inspection number and a serial number of the component, and click "Anlegen" to create a measurement. Now on the second page, the app will show all the measurement features saved in DB.

Second page  
![grafik](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/7effe5e1-7f99-4de4-945d-874485a1e117)

Users are required to fill in the "IST-Wert" (current value) for each feature.  
The app evaluates automatically the input current value by checking if it is within the "Max." (maximum value) and "Min." minimum value.  
If it is within the range, the column "Bewertung" (evaluation) shows "i.O" (okay). If it is not within the range, "n.i.O" (not okay) is shown and the row is red.  
Users can then click "Speichern" (save) to save the measurement data. After clicking save, it goes to the final page. Users can also click the button "Zurück" (back) to go back to the previous page.

Final page - Inspection results  
![grafik](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/196c1828-69a1-42cd-9eff-f3e6beb793d7)

The final page shows the evaluated measurement data. The measurement is createed. Users can click "Schließen" (close) to go back to homepage to create a new measurement.

On the homepage, the second button "Serialnummer anfordern" is used to create a new serial number for a component.

Serialnummer anfordern (Create a serial number):
![grafik](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/c9332a95-5cfc-46ea-ab59-41d3cfd65fd0)

After clicking it, users can choose the components which is going to be inspected. Then, click on "Anlegen" (create) and the app will show a message that a new serial number X is created.

For more info about the research project: [Artificial Intelligence Controlled Milling (AICoM)](https://lernendewerkzeugmaschine.de/)

## Table of Contents

- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [User Interface](#user-interface)
- [Data Management](#data-management)
- [Styling](#styling)
- [Troubleshooting](#troubleshooting)
- [Resources](#resources)
- [Contact](#contact)

## Getting Started

This app is sharing the same DB with Gühring Tool Management Software (GTMS). GTMS is used to maintain the details and tolerance of the measurement of components.

1. Refer to the user manual "Bauteilpruefung_GTMS-Anleitung" for a step by step guide to maintain the prerequisite data in GTMS. The manual is in the folder: D:\GTMS\Batueilpruefung.

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
│ ├── pictures/ # Logo and inspected components' pictures  
│ ├── index.html  
├── src/  
│ ├── components/  
│ │ ├── Header/  
│ │ │ ├── Header.js # Header with Home-Button  
│ │ │ ├── index.js  
│ │ ├── Image/  
│ │ │ ├── ImageModal.js # To enlarge the image of inspected component in Results page  
│ │ │ ├── index.js  
│ │ ├── Table/  
│ │ │ ├── SelectRow.js # Selection of inspection results "okay" or "not okay" for rows  
│ │ │ ├── TableAuftragPruefdaten.js # Table of the inspected results  
│ │ │ ├── TableAuftragPruefpositionen.js # Table for input measurements  
│ │ ├── UI/ # Styling of UI components  
│ │ │ ├── Button.js  
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

- Header: Header with Home-Button.
- Image: Image Enlargement upon Component Click: A user interface feature or interaction where an image associated with a specific component enlarges or magnifies when the user clicks on (or taps, in touch interfaces) that component.
- Table: Table for users to input measurements and showing evaluation results
- UI: Styling for common UI components Button, Select Input, Number Input, Text Input and Table

## Data Management

Data is fetched from a backend API using Fetch API and displayed in the UI components.

## Styling

Styling is done using styled-components.
Example:

## Troubleshooting

If you encounter any issues, try the following:

- Restart the backend API "AICoM Bauteilpruefung Backend API" at Windows Task Scheduler.

For more support, please contact software developer [Xiang Yi Kiong](xiangyi.kiong@guehring.de).

## Setting Up ESLint & Prettier

[ESLint](https://eslint.org/docs/latest/use/configure/configuration-files) is a static code analysis tool for identifying problematic patterns found in JavaScript code.

You can configure ESLint via .eslintrc.js file. It is in the root directory of this project.

[Prettier](https://prettier.io/docs/en/configuration.html) is an opinionated code formatter.

You can configure Prettier via .prettierrc.json file. It is in the root directory of this project.


## Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Styled-components Documentation](https://styled-components.com/docs)

## Contact

[Xiang Yi Kiong](xiangyi.kiong@guehring.de)
