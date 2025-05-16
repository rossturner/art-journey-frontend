import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import '@mantine/core/styles.css'
import {MantineProvider} from '@mantine/core'
import {HashRouter} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <HashRouter>
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            defaultColorScheme="dark"
        >
            <App/>
        </MantineProvider>
    </HashRouter>,
)
