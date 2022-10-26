import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// get current user
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
