# Project: Fetch French Business Data

## Description
This project fetches business data from the French government API based on a specific NAF code and department code, then saves the results as a CSV file.

## Prerequisites
Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later recommended)
- npm (Node Package Manager)

## Installation
```sh
# Clone the repository
git clone https://github.com/Auxioma/Scrapping.git
cd Scrapping

# Install dependencies
npm install
```

## Configuration
The project fetches data based on predefined constants:
```js
const CODE_NAF = '62.01Z'; // Business sector (IT consulting)
const CODE_POSTAL = '71'; // Department in France
```
To modify these settings, update the corresponding values in `index.js`.

## Usage
Run the script with the following command:
```sh
node index.js
```

## Dependencies
This project uses the following npm packages:
```sh
npm install undici json2csv fs
```
- `undici`: For making HTTP requests
- `json2csv`: To convert JSON data to CSV format
- `fs`: To handle file system operations

## Output
The script generates a `entreprise.csv` file containing business details with the following columns:
```csv
siren,nom,code_naf,adresse
123456789,Company Name,62.01Z,123 Rue Exemple, Paris
```

## Error Handling
If any errors occur during data retrieval, they will be logged to the console. The script stops execution if no businesses are found.

## License
This project is licensed under the MIT License.

