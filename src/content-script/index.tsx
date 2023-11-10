import { render } from 'preact'
import '../base.css'
import { getUserConfig, Theme } from '../config'
import { detectSystemColorScheme } from '../utils'
import ChatGPTContainer from './ChatGPTContainer'
import { config, SearchEngine } from './search-engine-configs'
import './styles.scss'
import { getPossibleElementByQuerySelector } from './utils'

async function mount(question: string, siteConfig: SearchEngine) {
  const container = document.createElement('div')
  container.className = 'chat-gpt-container'

  const userConfig = await getUserConfig()
  let theme: Theme
  if (userConfig.theme === Theme.Auto) {
    theme = detectSystemColorScheme()
  } else {
    theme = userConfig.theme
  }

  container.classList.add('gpt-dark')

  const siderbarContainer = getPossibleElementByQuerySelector(siteConfig.sidebarContainerQuery)
  if (siderbarContainer) {
    siderbarContainer.prepend(container)
  } else {
    container.classList.add('sidebar-free')
    const appendContainer = getPossibleElementByQuerySelector(siteConfig.appendContainerQuery)
    if (appendContainer) {
      appendContainer.appendChild(container)
    }
  }
  containerQueue.push(container)
  if (containerQueue.length > 2) {
    const containtToRemove = containerQueue.shift()
    containtToRemove.remove()
  }

  render(
    <ChatGPTContainer question={question} triggerMode={userConfig.triggerMode || 'always'} />,
    container,
  )
}

const siteRegex = new RegExp(Object.keys(config).join('|'))
const siteName = location.hostname.match(siteRegex)![0]
const siteConfig = config[siteName]
const containerQueue = []
const buttonStyle = `
  position: fixed;
  bottom: 20px;
  z-index: 9999;
`

async function load_button(button_name: string, buttonPosition: number) {
  const userConfig = await getUserConfig()

  const Btn = document.createElement('button')

  Btn.textContent = button_name
  Btn.addEventListener('click', () => {
    // Removed userConfig parameter here
    const selection = window.getSelection()
    if (selection) {
      const selectedText = selection.toString().trim()
      if (selectedText !== '') {
        const question =
          userConfig.prompts[button_name] + ' ---------WRITTING-GPT---------- ' + selectedText
        mount(question, siteConfig)
      }
    }
  })

  // Position the buttons
  Btn.style.cssText = `
    ${buttonStyle}
    left: ${buttonPosition}px;
  `

  // Add the buttons to the page
  document.body.appendChild(Btn)
}

// load all buttons
async function load_buttons() {
  const userConfig = await getUserConfig()
  // add more 70 px to each button
  let buttonPosition = 10
  for (const button_name in userConfig.prompts) {
    load_button(button_name, buttonPosition).catch((error) => {
      console.error('Error occurred:', error)
    })
    buttonPosition += 70
  }
}

load_buttons().catch((error) => {
  console.error('Error occurred:', error)
})
