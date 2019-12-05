module.exports = {
    title: 'DDB 2.0 Documentation',
    description: 'The documentation site for DDB 2.0',
    configureWebpack: {
        resolve: {
            alias: {
                '@assets': '/assets'
            }
        }
    },
    themeConfig: {
        sidebarDepth: 1,
        // Navbar setup
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guides', link: '/guide/' },
            { text: 'Components', link: '/components/' },
            { text: 'Store', link: '/store/' },
            { text: 'Reference', link: '/reference/' },
        ],
        // Sidebar setup
        sidebar: {
            '/guide/': [
                {
                    title: "Guide",
                    collapsable: false,
                    children: [
                        ['/guide/', 'Introduction'],
                        ['/guide/gettingStarted', 'Getting Started'],
                        ['/guide/displayingLoadingScreen', 'Displaying Loading Screen'],
                        ['/guide/creatingForms', 'Creating Forms'],
                        ['/guide/creatingModals', 'Creating Modals'],
                        ['/guide/creatingWidgets', 'Creating Widgets'],
                        ['/guide/extendingWidgets', 'Extending Widgets'],
                        ['/guide/theming', 'Theming'],
                        ['/guide/responsiveDesign', 'Responsive Design'],
                        ['/guide/deployment', 'Deployment'],
                        ['/guide/developerNotes', 'Developer Notes']
                    ]
                }
            ],
            '/components/': [
                {
                    title: "Components",
                    collapsable: false,
                    children: [
                        ['/components/appComponent', 'App'],
                        ['/components/containerComponents', 'Containers'],
                        ['/components/enhancerComponents', 'Enhancers'],
                        ['/components/formComponents', 'Forms'],
                        ['/components/higherOrderComponents', 'Higher Order Components'],
                        ['/components/loaderComponents', 'Loader'],
                        ['/components/marginalComponents', 'Marginals'],
                        ['/components/modalComponents', 'Modals'],
                        ['/components/modalImplementations', 'Modal Implementations'],
                        ['/components/tabComponents', 'Tabs'],
                        ['/components/themeComponents', 'Theme'],
                        ['/components/uiComponents', 'UI'],
                        ['/components/widgetComponents', 'Widgets']
                    ]
                }
            ],
            '/store/': [
                {
                    title: "Redux Store",
                    collapsable: false,
                    children: [
                        ['/store/generalStore.md', 'General Store'],
                        ['/store/miscStore.md', 'Misc Store'],
                        ['/store/tabStore.md', 'Tab Store'],
                        ['/store/themeStore.md', 'Theme Store'],
                        ['/store/widgetStore.md', 'Widget Store'],
                    ]
                }
            ],
            '/reference/': [
                {
                    title: "Reference",
                    collapsable: false,
                    children: [
                        ['/reference/constantsReference', 'Constants'],
                        ['/reference/managersReference', 'Managers'],
                        ['/reference/loaderReference', 'Loader'],
                        ['/reference/structureReference', 'Structure'],
                        ['/reference/stylesReference', 'Styles'],
                        ['/reference/thirdPartyPackagesReference', 'Third Party Packages'],
                        ['/reference/utilitiesReference', 'Utilities'],
                        [ '/store/', 'Store →'],
                        [ '/components/', 'Components →'],
                    ]
                }
            ],
        }
    }
}