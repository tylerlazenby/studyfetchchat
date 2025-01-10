'use server'

import OpenAI from 'openai'

const openai = new OpenAI()

/**
 * Send a message to the chatbot.
 * @param {string} content - Content of the message.
 * @returns {Promise<string | null>} - The chatbot's response.
 */
const sendMessage = async (content: string): Promise<string | null> => {
   const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        store: true,
        messages: [
            { role: 'system', content: "You are a programming instruction AI assistant."},
            {
                "role": "user",
                "content": content
            }
        ]
    })

    return completion.choices[0].message.content
}

export { sendMessage }