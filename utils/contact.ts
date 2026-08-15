// Single source of truth for the "start a project" contact link. The site has
// no mail backend — the CTAs hand off to the visitor's own mail client.
export const contactEmail = 'ramijames@gmail.com'
export const contactSubject = 'Work with Rami James'

export const contactMailto = `mailto:${contactEmail}?subject=${encodeURIComponent(contactSubject)}`
