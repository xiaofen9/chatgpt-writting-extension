import { fetchDirect } from '../fetch-sse'
import { GenerateAnswerParams, Provider } from '../types'

export class OpenAIProvider implements Provider {
  constructor(private token: string, private model: string) {
    this.token = token
    this.model = model
  }

  private _generatePrompt(prompt: string): object[] {
    const arrayPrompt = prompt.split('---------WRITTING-GPT----------')
    const res = [
      { role: 'system', content: arrayPrompt[0] },
      { role: 'user', content: arrayPrompt[1] },
    ]
    return res
  }

  async generateAnswer(params: GenerateAnswerParams) {
    let result = ''
    // params.prompt = "you are an helpful assistant. ---------WRITTING-GPT---------- 树上 10 只鸟，打掉 1 只，还剩几只？"
    await fetchDirect('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      signal: params.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: this._generatePrompt(params.prompt),
        temperature: 0.4,
      }),
      onMessage(message) {
        console.debug('sse message', message)
        let data
        try {
          data = JSON.parse(message)
          const text = data.choices[0].message.content
          result += text
          params.onEvent({
            type: 'answer',
            data: {
              text: result,
              messageId: data.id,
              conversationId: data.id,
            },
          })
        } catch (err) {
          console.error(err)
          return
        }

        params.onEvent({ type: 'done' })
        return
      },
    })
    return {}
  }
}
