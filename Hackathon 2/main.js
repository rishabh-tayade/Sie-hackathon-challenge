const https = require('https');

// URL of the scroll
const scrollUrl = 'https://raw.githubusercontent.com/siddjoshi/copilot-hackathon-challenges/main/scrolls.txt';

// Function to fetch the scroll content
function fetchScrollContent(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';

            // Collect data chunks
            response.on('data', (chunk) => {
                data += chunk;
            });

            // Resolve the promise when the response ends
            response.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Function to extract secrets from the scroll content
function extractSecrets(content) {
    const secretPattern = /\{\*(.*?)\*\}/g; // Regular expression to match secrets
    const secrets = [];
    let match;

    while ((match = secretPattern.exec(content)) !== null) {
        secrets.push(match[1].trim());
    }

    return secrets;
}

// Main function to retrieve and process the scroll
async function main() {
    try {
        console.log('Fetching the scroll content...');
        const scrollContent = await fetchScrollContent(scrollUrl);

        console.log('Extracting secrets...');
        const secrets = extractSecrets(scrollContent);

        console.log('Secrets found:');
        secrets.forEach((secret, index) => {
            console.log(`${index + 1}. ${secret}`);
        });
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

// Run the main function
main();