---
layout: post
title:  "Build an AI UI Generator with Gemini API, Next.js (Tutorial)"
date:   2024-07-17 07:00:44 +0530
image: images\2024\gemini_nextjs.jpg
categories: [AI]
--- 
%[https://www.youtube.com/watch?v=6CgeNtJwKFs] 

In my previous post, we built a UI generator from scratch using Next.js and the Gemini API. **This post is a quick guide on how to use the Gemini API in any of your Next.js apps**, in general.

<img src="\blog\images\2024\gemini_vscode.jpg?raw=true">
*Watch the video tutorial here: [https://www.youtube.com/watch?v=6CgeNtJwKFs](https://www.youtube.com/watch?v=6CgeNtJwKFs)*

### Step 1: Create a New project and install Gen AI SDK

For this tutorial, create a new next.js project from scratch by running:

```bash
npx create-next-app gemini-next-app
```

While you are at the terminal, change directory to your project root and install the Google AI SDK (we will use it later):

```bash
npm install @google/generative-ai
```

Remove all the boiler plate code in the `page.js` apart from the outer two divs to get an empty canvas for our home page.

### Step 2: Obtain the Gemini API Key

Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) to get your Gemini API key.

Create a `.env` file in the root directory and store your API key:

```json
GEMINI_API_KEY=[YOUR API KEY]
```

### Step 3: Create an API Route

API routes are basically functions that handle data requests and response.

In Next.js app directory, we store our API routes in `app/api` folder. This ensures that there is a clear separation between User interface and API related code.

Create a file `route.js` in directory `app/api/generate` . The code in this file maps to the `/api/generate` route of our application:

```javascript
// Import `GoogleGenerative` from the package we installed earlier.
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Create an asynchronous function POST to handle POST 
// request with parameters request and response.
export async function POST(req, res) {

    try {
        // Access your API key by creating an instance of GoogleGenerativeAI we'll call it GenAI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

        // Ininitalise a generative model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" })

        // Retrieve the data we recieve as part of the request body
        const data = await req.json()

        // Define a prompt varibale
        const prompt = data.body

        // Pass the prompt to the model and retrieve the output
        const result = await model.generateContent(prompt)
        const response = await result.response;
        const output = await response.text();

        // Send the llm output as a server reponse object
        return NextResponse.json({ output: output })
    } catch (error) {
        console.error(error)
    }
}
```

### Step 5: Use your API Route in your client

Let's use the API route we just created in our client by sending a POST request:

```javascript
import { useState } from "react";

export default function Home() {

  const prompt = "Write quote of the day."

  const [output, setOutput] = useState('This is a nextjs project.');
  
  // Define an asynchronous function to send POST request to our api
  const generateText = async () => {
    try {
        // use the fetch method to send an http request to /api/generate endpoint
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({body: prompt})
      });

    // Waits for the response to be converted to JSON format and stores it in the data variable
      const data = await response.json();
      
      //  If successful, updates the output state with the output field from the response data
      if(response.ok) {
        setOutput(data.output)
      } else {
        setOutput(data.error)
      }

    // Catches any errors that occur during the fetch request
    } catch(error) {
      console.error('Error:', error)
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-serif text-2xl lg:flex">
        <p onClick={generateText}>{output}</p>
      </div>
    </main>
  );
}
```

Here, we pass a simple prompt "write quote of the day" in request body of the HTTP request sent to `/api/generate` using the fetch method, and update our `output` state variable with the response text. Every time you click on the quote, it will generate another one.

And this is how you can leverage the power of Google's generative AI in your Next.js applications. Excited to see what you create with it :)