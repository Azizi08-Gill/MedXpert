import { Client, Account, Databases, Storage } from "appwrite";

// Access environment variables
// const Endpoint = process.env.REACT_APP_APPWRITE_ENDPOINT;
// const projectID = process.env.REACT_APP_APPWRITE_PROJECT_ID;
// const databaseId = process.env.REACT_APP_APPWRITE_DATABASE_ID;

const Endpoint = "https://cloud.appwrite.io/v1";
const projectID = "66db237e003406b538c0";
const databaseId = "66db24d6003760b1e1e1";



const client = new Client();

client
  .setEndpoint(Endpoint) // Your Appwrite Endpoint
  .setProject(projectID); // Your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { databaseId,projectID };