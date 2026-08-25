/** hCaptcha sitekey — public client value (free plan). */
export const HCAPTCHA_SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2'

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export function getWeb3FormsAccessKey(): string | undefined {
  return process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
}

export type Web3FormsPayload = {
  first_name: string
  last_name: string
  phone: string
  message: string
  captchaToken?: string
}

export async function submitToWeb3Forms(
  payload: Web3FormsPayload,
): Promise<{ ok: true } | { ok: false }> {
  const accessKey = getWeb3FormsAccessKey()
  if (!accessKey) return { ok: false }

  const formData = new FormData()
  formData.append('access_key', accessKey)
  formData.append('first_name', payload.first_name)
  formData.append('last_name', payload.last_name)
  formData.append('phone', payload.phone)
  formData.append('message', payload.message)
  formData.append('from_name', `${payload.first_name} ${payload.last_name}`.trim())
  if (payload.captchaToken) {
    formData.append('h-captcha-response', payload.captchaToken)
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      body: formData,
    })
    const data = (await response.json()) as { success?: boolean }
    return data.success ? { ok: true } : { ok: false }
  } catch {
    return { ok: false }
  }
}
