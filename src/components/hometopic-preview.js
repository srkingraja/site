import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import styles from './hometopic-preview.module.css'

export default ({ article }) => (
  <div className={styles.preview}>
    <Img alt="" sizes={article.heroImage.sizes} />
    <h3 className={styles.previewTitle}>
      <Link to={`/home/${article.slug}`}>{article.title}</Link>
    </h3>
    <p
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
  </div>
)
