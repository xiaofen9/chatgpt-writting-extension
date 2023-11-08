import { Button, Spinner, Tabs, Textarea, useToasts } from '@geist-ui/core'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { getUserConfig, resetUserConfig, updateUserConfig } from '../config'

interface PromptsConfig {
  [key: string]: string
}

interface PromptConfigProps {
  prompts: PromptsConfig
}

const PromptConfigPanel: FC<PromptConfigProps> = ({ prompts }) => {
  const [promptsState, setPromptsState] = useState(prompts)
  const [tab, setTab] = useState(Object.keys(prompts)[0]) // Initialize to the first key of prompts
  const { setToast } = useToasts()
  const textareaRef = useRef(null)

  const adjustTextareaHeight = (obj) => {
    obj.style.height = 'auto'
    obj.style.height = obj.scrollHeight + 'px'
  }

  useEffect(() => {
    if (textareaRef.current) {
      adjustTextareaHeight(textareaRef.current)
    }
  }, [promptsState]) // Depend on promptsState so it will resize whenever the state changes

  const save = useCallback(async () => {
    await updateUserConfig({
      prompts: promptsState,
    })
    setToast({ text: 'Prompts saved successfully', type: 'success' })
  }, [promptsState, setToast])

  const reset = useCallback(async () => {
    await resetUserConfig('prompts')
    await getUserConfig().then((config) => {
      setPromptsState(config.prompts)
    })
    setToast({ text: 'Prompts reset successfully', type: 'success' })
  }, [promptsState, setToast])

  const handleChange = (key: string, value: string) => {
    setPromptsState((prevState) => ({ ...prevState, [key]: value }))
  }

  return (
    <div className="flex flex-col gap-3">
      <Tabs value={tab} onChange={(value) => setTab(value)}>
        {Object.keys(prompts).map((promptKey) => (
          <Tabs.Item label={promptKey} value={promptKey} key={promptKey}>
            <Textarea
              ref={textareaRef}
              onFocus={(e) => adjustTextareaHeight(e.target)}
              width="100%"
              value={promptsState[promptKey]}
              onChange={(e) => handleChange(promptKey, e.target.value)}
              placeholder={`Enter ${promptKey}...`}
            />
          </Tabs.Item>
        ))}
      </Tabs>
      <Button scale={2 / 3} ghost style={{ width: '100%' }} type="success" onClick={save}>
        Save
      </Button>
      <Button scale={2 / 3} ghost style={{ width: '100%' }} type="success" onClick={reset}>
        Reset Two Prompts
      </Button>
    </div>
  )
}

function PromptSelect() {
  const query = useSWR('user-config', async () => getUserConfig())

  if (query.isLoading) {
    // We can only render PromptConfigPanel once userConfig is fetched.
    return <Spinner />
  }
  console.log('query.data', query.data)
  return <PromptConfigPanel prompts={query.data!.prompts} />
}

export default PromptSelect
