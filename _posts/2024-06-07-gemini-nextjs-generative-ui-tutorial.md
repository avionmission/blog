---
layout: post
title:  "Build an AI UI Generator with Gemini API, Next.js (Tutorial)"
date:   2024-06-07 07:00:44 +0530
image: images\2024\gemini_nextjs.jpg
categories: [AI]
--- 

In this tutorial, we will build an AI UI Generator using Next.js and the Gemini API. It is similar to [v.0 by Vercel](https://v0.dev/) which allows you to generate UI with a simple prompt and use it in your web apps.

This type of dynamic code generation can be the beginning of a new paradigm in software development where User Interfaces are generated by AI according to user's needs. This concept is being termed as "Generative UI".

Here's an example of how our application will work:
<img src="https://github.com/avionmission/ui-generator/raw/master/public/uigeneratordemo.png">
*Watch the video tutorial here: [https://www.youtube.com/watch?v=IFQI3t89eO8](https://www.youtube.com/watch?v=IFQI3t89eO8)*

Let's begin by creating a new Next.js project.

### Step 1: Create a new Next.js project

```bash
npx create-next-app@13.4 ui-generator
```

You will be prompted to select settings for the new project, make sure to follow these choices:

* For TypeScript, select **No** because this tutorial uses JavaScript.
    
* Feel free to choose any option for enabling ESLint.
    
* Choose **Yes** for Tailwind CSS.
    
* Exclude the *src/* directory by selecting **No**, which is the default option.
    
* Enable App Router by selecting **Yes**, which is the recommended option.
    
* Lastly, select **No** for `import alias` configuration.
    

Change the working directory to your new Next.js project, *ui-generator* and run the application to make sure everything is fine:

```bash
cd ui-generator
npx run dev
```

### Step 2: Building the Frontend

In the new app router in Next.js, `app/page.js` hosts the code for the home page. Remove everything inside it apart from the outer `div`s, and now we have an empty canvas to create anything we want.

Create a simple interface for this application which includes an input box to enter a prompt, a `div` placeholder for the code to be generated, and button to copy code:

```jsx
'use client'

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <div className="max-w-5xl w-full flex-col items-center justify-center text-sm lg:flex">
        <p className='text-3xl mb-4 font-bold text-gray-600'>UI Generator</p>
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-md bg-transparent overflow-hidden">
          <input
            className="peer h-full w-full outline-none bg-gray-100 text-sm text-gray-700 pl-4 pr-12"
            type="text"
            placeholder="Enter a prompt..."
          />
          <div onClick={handleGenerate} className="absolute right-0 flex items-center justify-center h-full w-12 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer">
            <p className='text-2xl'>➔</p>
          </div>
        </div>

        <div className='flex'>
          <button className='bg-blue-500 text-white px-5 py-3 mt-7 hover:bg-blue-600 m-2' onClick={handleCopy}>Copy Code</button>
        </div>

        <div className='bg-transparent border-2 border-gray-300 rounded mt-7 p-2 flex justify-center'>
          {/* Generated code */}
        </div>

      </div>
    </main>
  )
}
```

### Step 3: Obtain the Gemini API Key

Before we start working on our back-end of the application, we need to obtain the Gemini API key to be able to leverage Google's generative AI tools.

Go to [https://ai.google.dev/aistudio](https://ai.google.dev/aistudio) to get the Gemini API key for free.

Create a `.env` file in the root of your project and store your API key:

```jsx
GEMINI_API_KEY=[YOUR API KEY]
```

### Step 4: Create server-side function to handle POST Requests

Install the Google AI JavaScript SDK enables you to use Google's generative AI models. Make sure you are in your project's root directory and run the following command in your terminal:

```bash
npm install @google/generative-ai
```

In Next.js app router, you can define custom route handlers in `route.js` file inside the app director. For example the file `app/api/generate/route.js` maps to `/api/generate` route.

Let's create a function to handle POST requests in `/api/generate/route.js` :

```jsx
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const data = await req.json()
        const prompt = data.body + ". Write jsx code and use tailwindcss for modern UI. Don't make any imports. Only output code.";

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const code = await response.text()

        return NextResponse.json({code: code})
    } catch (error) {
        console.error(error)     
    }
}
```

Here, we create an instance of `GoogleGenerativeAI` from the API key we stored in the `.env` file, define a model that uses `gemini-pro` model.

We retrieve the JSON data from the request body and store it in a variable `data`. But we don't directly pass it as a prompt to the Gemini API. Instead, we add some "prompt injection", i.e. additional instruction for the AI model so that we can have control over the output we get.

Then we pass the prompt to Gemini using the `generateContent()` method. Finally we pass the generated output as a JSON response object.

### Step 5: Create a client side function to handle POST request

First, we will define two state variables in our home page `page.js` :

```jsx
const [prompt, setPrompt] = useState('');
const [code, setCode] = useState('');
```

Set an `onChange` listener to bind the state variable `prompt` to the input text:

```jsx
<input
  className="peer h-full w-full outline-none bg-gray-100 text-sm text-gray-700 pl-4 pr-12"
  type="text"
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  placeholder="Enter a prompt..."
/>
```

Create a function called `handleGenerate()` above the return function:

```jsx
const handleGenerate = async () => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: prompt })
      });

      const data = await response.json();
      if (response.ok) {
        setCode(data.code);

      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
```

This function initiates an HTTP POST request to the endpoint `/api/generate` using the `fetch` function. It sends the prompt as a request object.

Set an `onClick` listener in your send button to execute the `handleGenerate` function:

```jsx
<div onClick={handleGenerate} className="absolute right-0 flex items-center justify-center h-full w-12 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer">
    <p className='text-2xl'>➔</p>
</div>
```

We need to display the code which is stored in the `code` state variable somewhere:

```jsx
<div className='bg-transparent rounded mt-7 p-2 flex justify-center'>
    {code}
</div>
```

Now test the application by running `npm run dev` and test the application by entering a prompt such as "create a pricing section for my website".

### Step 6: Rendering Generated JSX Code

Now the final piece of the puzzle is rendering the generated code into user interface instead of just displaying the code. For that, we will use a library called `html-react-parser` .

Open a new terminal, change directory to the root of your project and run:

```bash
npm install html-react-parser
```

To use `html-react-parser` , in your `page.js` make the following import:

```jsx
import parser from 'html-react-parser';
```

Now use the `parse` method to convert String into JSX code:

```jsx
<div className='bg-transparent rounded mt-7 p-2 flex justify-center'>
    {parse(code)}
</div>
```

### Step 7: Function to Copy code

You can write a function to copy code:

```jsx
const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Code copied to clipboard")
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }
```

It uses the `navigator.clipboard.writeText` method to write the text stored in the variable `code` to the system clipboard.

### Wrapping Up

You can get the full code for this project at the github repo: [https://github.com/avionmission/ui-generator](https://github.com/avionmission/ui-generator)