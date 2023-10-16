// ** Routes Imports
import AppRoutes from './Apps'
//import FormRoutes from './Forms'
import PagesRoutes from './Pages'
//import TablesRoutes from './Tables'
//import ChartMapsRoutes from './ChartsMaps'
//import DashboardRoutes from './Dashboards'
//import UiElementRoutes from './UiElements'
//import ExtensionsRoutes from './Extensions'
//import PageLayoutsRoutes from './PageLayouts'

// ** Document title
const TemplateTitle = '%'

// ** Default Route
const DefaultRoute = '/dashboard'

// ** Merge Routes
const Routes = [
  ...AppRoutes,
  ...PagesRoutes
 
]

export { DefaultRoute, TemplateTitle, Routes }
