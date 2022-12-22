import React, { ReactElement } from 'react'
import styles from './index.module.css'
import Markdown from '../../atoms/Markdown'
import { useSiteMetadata } from '../../../hooks/useSiteMetadata'
import { ReactComponent as PeproLogo } from '../../../images/perpetuumprogress.svg'
import Links from './Links'
import Container from '../../atoms/Container'

export default function Footer(): ReactElement {
  const { siteTaglineclean, footer } = useSiteMetadata()
  const { copyright, subtitle } = footer

  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <div>
          <p className={styles.siteTitle}>{siteTaglineclean}</p>
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
