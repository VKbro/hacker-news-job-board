import { HttpInterceptorFn } from '@angular/common/http';

export const jobListingInterceptor: HttpInterceptorFn = (req, next) => {
  req.headers.set('Accept', 'application/json');
  return next(req);
};
