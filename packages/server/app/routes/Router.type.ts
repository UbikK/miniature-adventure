import { Router } from "oak";

export  type IRouter = {
    _router: Router;
    _adapter: any;

     initialize: () => void
     get router():  Router
}