const { fetch } = require('undici'); // Import 'fetch' from the 'undici' module for making HTTP requests
const fs = require('fs'); // Import 'fs' module for file system operations
const { parse } = require('json2csv'); // Import 'parse' function from 'json2csv' for converting JSON to CSV

// Define constants for business activity code and postal code
const CODE_NAF = '62.01Z'; // NAF code for IT consulting companies
const CODE_POSTAL = '71'; // Postal code for the target region

// Construct the base URL for the API request
const BASE_URL = `https://recherche-entreprises.api.gouv.fr/search?activite_principale=${CODE_NAF}&departement=${CODE_POSTAL}&limite_matching_etablissements=10&minimal=true&page=`;

const OUTPUT_FILE = 'entreprise.csv'; // Define the output CSV file name
const PER_PAGE = 10; // Number of records per API request page
const MAX_PAGE = 100; // Maximum number of pages to fetch

// Asynchronous function to fetch data from the API
async function fetchData() {
    let allEntreprises = []; // Array to store all retrieved businesses

    try {
        // Loop through pages up to the maximum limit
        for (let page = 1; page <= MAX_PAGE; page++) {

            // Fetch data from the API for the current page
            const reponse = await fetch(`${BASE_URL}${page}&per_page=${PER_PAGE}`);

            // Check if the response is successful
            if (!reponse.ok) {
                throw new Error(`HTTP error: ${reponse.status}`);
            }

            // Parse response JSON data
            const data = await reponse.json();

            // If no results, stop the fetching process
            if (!data.results || data.results.length === 0) {
                console.log('No businesses found');
                return;
            }

            // Map API data to an array of objects with specific properties
            const entreprises = data.results.map(entreprise => ({
                siren: entreprise.siren, // Unique business identifier
                nom: entreprise.nom_complet, // Business name
                code_naf: entreprise.activite_principale, // Business activity code
                adresse: entreprise.geo_adresse // Business address
            }));

            // Append retrieved businesses to the main array
            allEntreprises = allEntreprises.concat(entreprises);
            console.log(`Page: ${page} retrieved`);
        }

        // Convert the collected data to CSV format
        const csv = parse(allEntreprises, { fields: ['siren', 'nom', 'NAF', 'adresse'] });

        // Write the CSV data to a file
        fs.writeFileSync(OUTPUT_FILE, csv, 'utf8');
        console.log(`Data saved to ${OUTPUT_FILE}`);

    } catch (error) {
        // Handle and log errors
        console.log('Error retrieving data', error);
    }
}

// Call the function to start fetching data
fetchData();
