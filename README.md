# VIN Decoder — vehicle VIN lookup with history and variable reference

🔗 Live Demo (https://natalia2408-forever.github.io/VIN_Decoder_testtask_ABP/)

🧩 Description
This is a project that decodes 17-character Vehicle Identification Numbers (VIN) via the public NHTSA vPIC API and displays the results in a clean, readable format. Users can look up a VIN, revisit their three most recent requests, and browse the full reference list of decodable variables along with detailed descriptions for each one.

🛠 Technologies
* React – built with functional components and Hooks (useState, useEffect, useCallback) for a dynamic UI.
* TypeScript – implemented for static typing to ensure code reliability and a better developer experience.
* React Router (HashRouter) – handles client-side navigation between the home page, the variables list, and individual variable pages; HashRouter is used specifically to avoid routing issues on GitHub Pages.
* SCSS - modular styling with a focus on responsive design and maintainable code.
* React Spinners – provides visual feedback during API requests to enhance user experience.
* NHTSA vPIC API – public, key-free API used for both decoding VINs and fetching the full list of vehicle variables.


🎯 Key Features
* Decode any 17-character VIN and view its characteristics in a readable list.
* Client-side form validation: empty field, length (17 characters), forbidden characters (I, O, Q).
* Clear error handling: validation errors and API error messages are shown directly in the UI.
* History of the three most recent VIN lookups, stored locally, with the ability to re-apply any of them without a new API call.
* Dedicated `/variables` page listing all decodable variables with their data type and group.
* Dedicated `/variables/:variableId` page with a full description of a single variable.
* Keyboard support: Escape clears the current result/input and returns focus to the VIN field.
* Responsive layout without external CSS frameworks, correct from 420px to 1440px.


▶️ How to run
* Clone repository: git clone `https://github.com/Natalia2408-forever/VIN_Decoder_testtask_ABP.git`
* Navigate into the project directory: `cd VIN_Decoder_testtask_ABP`
* Install the dependencies: `npm install`
* Run the app: `npm start`
