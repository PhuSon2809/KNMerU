export interface Route {
  routeId: number
  routeName: string
  routeDescription: string
  isCompleted: boolean
}

export interface RouteData {
  currentRouteId: number
  currentRouteIndex: number
  isFinished: boolean
  routes: Route[]
}
