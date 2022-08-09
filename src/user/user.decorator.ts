import { createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((_, ctx) => {
    return ctx.switchToHttp().getRequest().user;
});