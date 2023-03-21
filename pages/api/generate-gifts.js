import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { ocassion, priceMin, priceMax, gender, age, hobbies, gifttype } =
    req.body;
  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: generatePrompt(
          ocassion,
          priceMin,
          priceMax,
          gender,
          age,
          hobbies,
          gifttype
        ),
      },
    ],
    temperature: 0.3,
    max_tokens: 150,
  });
  // console.log("completion.data is: ", completion.data);
  res.status(200).json({ result: completion.data.choices[0].message.content });
}
function generatePrompt(
  ocassion,
  priceMin,
  priceMax,
  gender,
  age,
  hobbies,
  gifttype
) {
  const cont = `Strictly in less than 200 words or 6 seconds, Suggest top 3 ${ocassion} gift ideas those are ${gifttype} between ${priceMin}$ and ${priceMax}$ for ${age} years old ${gender} that is into ${hobbies}. Also add only one short personalized message at the end of all 3.`;
  // console.log("content: ", cont);
  return cont;
}
