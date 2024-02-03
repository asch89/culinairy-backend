import { Configuration, OpenAIApi } from "openai";
import Express from "express";
import CorsOptions from "cors";
import dotenv from "dotenv";
const app = Express()
const port = 3000
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(CorsOptions(corsOptions));
app.use(Express.json());

app.post('/', async (req, res) => {
    let data = req.body.join(", ");

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": `give me some recipe ideas using the following ingredients: ${data}`}],
        temperature: 0.6,
        max_tokens: 1024,
        });
        res.status(200).json({ result: completion.data.choices[0].message.content });

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(process.env.OPENAI_API_KEY);
})