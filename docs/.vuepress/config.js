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
        text: '前端知识',
        link: '/knowledge/'
      },
      {
        text: 'React',
        link: '/react/'
      }
    ],
    sidebar: {
      '/blog/': [
        {
          title: '博客',
          children: [
            '',
            'js模块化',
            '大厂面试题',
            '前端安全',
            'vue-lifecycle',
            'js继承',
            'className规范',
            'airbnb-style-guide',
          ]
        }
      ],
      '/knowledge/': [
        {
          title: '前端知识',
          children: [
            '',
            'React',
            'Css',
          ]
        }
      ],
      '/react/': [
        {
          title: 'React',
          children: [
            '',
            'setState',
          ]
        }
      ],
    }
  }
}
