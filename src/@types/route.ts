export interface Route {
  routeId: number
  routeName: string
  routeDescription: string
  isCompleted: boolean
  usedCard?: {
    cardId: number;
    cardName: string;
    usedAt?: string;
};
}

export interface RouteData {
  currentRouteId: number
  currentRouteIndex: number
  isFinished: boolean
  routes: Route[]
}
