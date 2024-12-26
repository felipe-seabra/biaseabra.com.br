'use client'

import CookieConsent from 'react-cookie-consent'

const COOKIE_STYLE: React.CSSProperties = {
  background: '#101010',
  textAlign: 'left',
  fontSize: '16px',
  padding: '20px',
}

export function CookieConsentComponent(): JSX.Element {
  return (
    <div>
      <CookieConsent
        cookieName="biaseabra_cookie_consent"
        style={COOKIE_STYLE}
        buttonText="Aceitar"
        expires={30}
        buttonClasses="cookie-btn"
      >
        &#34;Este site utiliza cookies para seu adequado funcionamento,
        análises, personalização e publicidade. Ao navegar neste site, você está
        de acordo com a nossa Política de Privacidade.&#34;
      </CookieConsent>
    </div>
  )
}
