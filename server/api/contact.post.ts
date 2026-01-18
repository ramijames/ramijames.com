import { Resend } from 'resend'

interface ContactFormData {
  name: string
  email: string
  description: string
  stage: string
  budget: string
}

const stageLabels: Record<string, string> = {
  'concept': 'Concept',
  'needs-redesign': 'Needs redesign',
  'needs-review': 'Needs review',
  'live': 'Live'
}

const budgetLabels: Record<string, string> = {
  'under-1k': '< $1k',
  '1k-10k': '$1k - $10k',
  '10k-plus': '$10k+'
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Check if API key exists
  if (!config.resendApiKey) {
    console.error('RESEND_API_KEY is not configured')
    throw createError({
      statusCode: 500,
      statusMessage: 'Email service not configured'
    })
  }

  const resend = new Resend(config.resendApiKey as string)

  const body = await readBody<ContactFormData>(event)

  if (!body.name || !body.email || !body.description || !body.stage || !body.budget) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    })
  }

  try {
    console.log('Attempting to send email to:', 'ramijames@gmail.com')

    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['ramijames@gmail.com'],
      replyTo: body.email,
      subject: `New Project Inquiry from ${body.name}`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Project Stage:</strong> ${stageLabels[body.stage] || body.stage}</p>
        <p><strong>Budget:</strong> ${budgetLabels[body.budget] || body.budget}</p>
        <h3>Project Description:</h3>
        <p>${body.description.replace(/\n/g, '<br>')}</p>
      `
    })

    if (error) {
      console.error('Resend API error:', JSON.stringify(error, null, 2))
      throw createError({
        statusCode: 500,
        statusMessage: error.message || 'Failed to send email'
      })
    }

    console.log('Email sent successfully:', data?.id)
    return { success: true, id: data?.id }
  } catch (err: any) {
    console.error('Email send error:', err?.message || err)
    throw createError({
      statusCode: 500,
      statusMessage: err?.message || 'Failed to send email'
    })
  }
})
