const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const homeTopic = path.resolve('./src/templates/home-topic.js')
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const brmTopic = path.resolve('./src/templates/brm-topic.js')
    resolve(
      graphql(
        `
          {
            allContentfulHomeTopic {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const homeTopics = result.data.allContentfulHomeTopic.edges
        homeTopics.forEach((post, index) => {
          createPage({
            path: `/home/${post.node.slug}/`,
            component: homeTopic,
            context: {
              slug: post.node.slug
            },
          })
        })
      })
    )

    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug
            },
          })
        })
      })
    )

    resolve(
      graphql(
        `
          {
            allContentfulBrmTopic {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const topics = result.data.allContentfulBrmTopic.edges
        topics.forEach((post, index) => {
          createPage({
            path: `/brm/${post.node.slug}/`,
            component: brmTopic,
            context: {
              slug: post.node.slug
            },
          })
        })
      })
    )
  })
}