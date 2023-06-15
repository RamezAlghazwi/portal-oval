import React, { ReactElement } from 'react'
import styles from './Footer.module.css'
import Markdown from '@shared/Markdown'
import Links from './Links'
import { useMarketMetadata } from '@context/MarketMetadata'
import PeproLogo from '@images/perpetuumprogress.svg'
import Container from '@components/@shared/atoms/Container'

export default function Footer(): ReactElement {
  const { siteContent } = useMarketMetadata()
  const { siteTitle, footer } = siteContent
  const { copyright, subtitle } = footer

  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <div>
          <p className={styles.siteTitle}></p>
          <a
            href="https://perpetuum-progress.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.main}>
              <PeproLogo />
              <p className={styles.subtitle}>{subtitle}</p>
            </div>
          </a>
        </div>
        <Links />
      </Container>
      <div className={styles.copyright}>
        <Markdown text={copyright} />
      </div>
    </footer>
  )
}
