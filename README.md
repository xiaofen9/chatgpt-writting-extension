# ChatGPT for Academic Writters
This repo is based on https://github.com/wong2/chatgpt-google-extension

## Motivation 
GPT (Generative Pre-trained Transformer) is a powerful language model that can be used to assist with editing works. One way that GPT can help with editing is by organizing the major logic points in a piece of writing.

To do this, a writer just need to input their major logic points into GPT and allow the model to generate an outline or structure for the piece. GPT can then suggest different ways of organizing the points to create a coherent and logical flow.

In addition, GPT can also be used to suggest different ways of phrasing sentences or paragraphs to improve the overall readability and clarity of the writing. The model can identify common grammar and syntax errors and make suggestions for corrections.

Another way that GPT can be useful for editing is by providing alternative phrasings or word choices to help avoid repetition and improve the variety of language used in the writing.

## Supported Platforms 

Overleaf, HackMd

## Installation
1. Download the [build.zip]([https://github.com/xiaofen9/chatgpt-writting-extension/blob/main/gptwritter.crx](https://github.com/xiaofen9/chatgpt-writting-extension/blob/main/build.zip)) and unzip it
2. Open `chrome://extensions` in your chrome, and click `load unpacked`
3. Load `build/chromium/` or `build/firefox/` directory to your browser


Or build from source by yourself.

1. Clone the repo
2. Install dependencies with `npm`
3. `npm install`
3. `npm run build`
4. Load `build/chromium/` or `build/firefox/` directory to your browser


## How to use
Intuitive workflow:
- First, you select the text
- Second, you click btns to let chatgpt to rewrite or concise your text.
![image](https://user-images.githubusercontent.com/20917869/221438513-3ac5bfb4-3d73-4fae-97a5-1c14622d96af.png)

## Features
- Supoorts `rewrite for clarity` and `concise` feature
- Supports the official OpenAI API
- Supports ChatGPT Plus
- Markdown rendering
- Code highlights
- Dark mode
- Provide feedback to improve ChatGPT
- Copy to clipboard
- Custom trigger mode
- Switch languages


