module.exports = {
  base: '/myblog/',
  title: 'Oyv1cent',
  description: 'Yesterday you said tomorrow！',
  head: [
    ['link', { rel: 'icon', href: '/3.png' }]
  ],
  markdown: {
    toc: {
      includeLevel: [2, 3, 4, 5, 6]
    }
  },
  themeConfig: {
    repo: 'oyv1cent/myblog',
    docsDir: 'docs',
    sidebarDepth: 3,
    nav: [
      {
        text: 'Blog',
        link: '/blog/',
      },
      {
        text: '收藏',
        link: '/collect/'
      }
    ],
    sidebar: {
      '/blog/': [
        {
          title: '博客',
          children: [
            '',
            'vue-lifecycle'
          ]
        }
      ],
      '/collect/': [
        {
          title: '收藏',
          children: [
            '',
            'airbnb-style-guide'
          ]
        }
      ],
    }
  }
}
