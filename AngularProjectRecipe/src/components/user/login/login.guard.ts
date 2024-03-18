import {CanActivateFn} from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
	if (localStorage.getItem('isLogin') != null) return true;
	return false;
};
