import axios from 'axios';

const mailchimpApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // Replace <dc> with your Mailchimp data center prefix
  headers: {
    'Authorization': '46f3614a5147e377b881a776b3a77d34-us1', // Replace with your Mailchimp API key
    'Content-Type': 'application/json',
  },
});

export default mailchimpApi;