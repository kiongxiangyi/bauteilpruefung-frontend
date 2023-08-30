# About The Project

This project is a web application developed for a research project AICoM. There are two main functions:

1. Users can create a new serial number for an inspection.
2. Users can start an inspection of a component. It is required to enter all the inspection's results after starting the inspection. The app will evaluate the results immediately for the users and save them in DB.

![image](https://github.com/kiongxiangyi/bauteilpruefung-frontend/assets/102138068/1c5a4b12-71ed-44d2-8025-6653c5dc061f)

For more info about the research project: [Artificial Intelligence Controlled Milling (AICoM)](https://lernendewerkzeugmaschine.de/)

## Table of Contents

- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [User Interface](#user-interface)
- [Data Management](#data-management)
- [State Management](#state-management)
- [Styling](#styling)
- [Troubleshooting](#troubleshooting)
- [Resources](#resources)
- [Conclusion](#conclusion)

## Getting Started

1. Maintain the prerequisite data in GTMS. Refer to the "Bauteilpruefung_GTMS-Anleitung" Manual.
2. Visit http://localhost:7000 to start the app.

## Technologies Used

- React
- Fetch API for data fetching
- Styled-components for styling

## Project Structure

├── src/  
│ ├── components/  
│ │ ├── Header/  
│ │ │ ├── Header.js # Navigation bar with Home-Button  
│ │ │ ├── index.js  
│ │ ├── Image/  
│ │ │ ├── ImageModal.js # To enlarge the image of inspected component in Result page  
│ │ │ ├── index.js  
│ │ ├── Table/  
│ │ │ ├── SelectRow.js # Select "okay" or "not okay" for rows  
│ │ │ ├── TableAuftragPruefdaten.js # Show the table of the inspected results  
│ │ │ ├── TableAuftragPruefpositionen.js # Show the table for inspection  
│ │ ├── UI/ # Styles of UI components  
│ │ │ ├── Button.js  
│ │ │ ├── NumberInput.js  
│ │ │ ├── SelectMenu.js  
│ │ │ ├── Table.js  
│ │ │ ├── TextInput.js  
│ ├── layouts/  
│ │ ├── Layout.js # Layout for every page  
│ ├── pages/  
│ │ ├── Bauteilpruefung/  
│ │ │ ├── Bauteilpruefung.js # The first function in homepage to select the inspection number and serial number  
│ │ │ ├── index.js  
│ │ ├── Finalpage/  
│ │ │ ├── Finalpage.js # Show the saved evaluated results  
│ │ │ ├── index.js  
│ │ ├── Menu/  
│ │ │ ├── Menu.js # The homepage with two functions  
│ │ │ ├── index.js  
│ │ ├── Results/  
│ │ │ ├── Results.js # For users to input inspection's value and it shows the evaluated results  
│ │ │ ├── index.js  
│ │ ├── Serialnummer/ # The second function in homepage to assign new serial number  
│ │ │ ├── Serialnummer.js  
│ │ │ ├── index.js  
│ ├── App.js # App main component  
│ ├── index.js # Entry pint of app  
├── public/  
│ ├── pictures/  
│ ├── index.html

## User Interface

This app consists of the following main UI components:

- Header: Navigation bar with Home-Button.
- ImageModal: To enlarge the image of a inspected component.
- Table: Display the table of inspection's parameters and the table of the inspection's results.
- UI: Different UI components such as Button, Select Input, Number Input, Text Input and styles for Table

## Data Management

Data is fetched from a backend API using Fetch API and displayed in the UI components.

## State Management

The React useState Hook is used.

## Styling

Styling is done using styled-components.

## Troubleshooting

If you encounter any issues, try the following:

- Restart the backend API.

## Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Styled-components Documentation](https://styled-components.com/docs)

## Conclusion

Thank you for checking out this app!
