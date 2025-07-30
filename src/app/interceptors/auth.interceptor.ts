import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem("applicationToken");
  // clone the request to add the new header
  if(token != null){
    let cloneRequest = req.clone({
    headers: req.headers.set("token" , token)
    });
    return next(cloneRequest);
  }
  return next(req);
};
