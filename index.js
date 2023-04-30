import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from "openai";
import * as readline from 'node:readline';
// const readline = require('readline');

dotenv.config()

const openaiapi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

userInterface.prompt();

const history = [];

userInterface.on('line', async (line) => {
  history.push({role: 'user', content: line})
  const res = await openaiapi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: history,
  })

  console.log(res.data.choices[0].message.content)
  userInterface.prompt();
})
