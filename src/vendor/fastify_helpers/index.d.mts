import  { type TObject, type Static, type TSchema, Type } from "@sinclair/typebox"
import type  { FastifyRequest, FastifyReply, RawServerDefault, RawRequestDefaultExpression, RawReplyDefaultExpression, FastifyInstance, FastifySchema, RouteGenericInterface, ContextConfigDefault  } from "fastify";
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

type ApiRequest<Body extends TObject, Params extends TObject, Reply extends TObject> = {
    Body: Static<Body>;
    Params: Static<Params>;
    Reply: Static<Reply>;
};

export type FastifyRequestTypebox<TSchema extends FastifySchema> = FastifyRequest<
    RouteGenericInterface,
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    TSchema,
    TypeBoxTypeProvider
>;

export type FastifyReplyTypebox<TSchema extends FastifySchema> = FastifyReply<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteGenericInterface,
  ContextConfigDefault,
  TSchema,
  TypeBoxTypeProvider
>

// export function defineSchema<P extends TObject, Q extends TObject, B extends TObject, H extends TObject, Rep extends TObject, Resp extends Record<number, TObject>>(schema :ControllerSchema<P, Q, B, H, Rep, Resp>) {
//     return schema;
// }

export type BaseSchema = {
    query?: TObject<any>;
    body?: TObject<any>;
    params?: TObject<any>;
    headers?: TObject<any>
    response?: Record<number | string, TSchema>
}

export type DefinedSchema<Q, B, P, H> = {
    query?: TObject<Q>;
    body?: TObject<B>;
    params?: TObject<P>;
    headers?: TObject<H>
    response?: Record<number | string, TSchema>
}

export function defineSchema<S = BaseSchema>(schema :S) : S;

type UnknownController = {
    data?: any
    schema?: any;
    handler: any
    preHandler?: ((req: any, resp: any, next: () => void) => void)[] 
}

type BaseController<S extends BaseSchema, D extends TSchema> = {
    data?: D;
    schema?: S;
    preHandler?: ((req: FastifyRequestTypebox<S>, resp: FastifyReplyTypebox<S>, next: () => void) => void)[] 
    // @ts-ignore
    handler: (req: FastifyRequestTypebox<S> & { data: Static<D> }, rep: FastifyReplyTypebox<S> ) => Promise<Static<S["response"][200]>>;
}

type PredefinedController<S extends BaseSchema, S0 extends BaseSchema, D> = {
    data?: D;
    schema?: S;
    preHandler?: ((req: FastifyRequestTypebox<S>, resp: FastifyReplyTypebox<S>, next: () => void) => void)[] 
    // @ts-ignore
    handler: (req: FastifyRequestTypebox<S & S0> & { data: Static<D> }, rep: FastifyReplyTypebox<S & S0> ) => Promise<Static<S["response"][200]>>;
}


// export const useControllerDefinition = <S extends Omit<BaseSchema, "response">, D extends TSchema>(definition :Omit<BaseController<S, D>, "handler">) => <S1 extends BaseSchema, D1>(options :PredefinedController<S1, S, D & D1>) => typeof definition & typeof options
export const useControllerDefinition = <S extends BaseSchema, D extends TSchema>(definition :Omit<BaseController<S, D>, "handler">) => <S1 extends BaseSchema, D1>(options :PredefinedController<S1, S, D & D1>) => any

type OldControllerOptions<S> = { 
    schema? :S,
    preHandler?: ((req: FastifyRequestTypebox<S>, resp: FastifyReplyTypebox<S>, next: Function) => void)[] 
    //@ts-ignore
    handler: (req: FastifyRequestTypebox<S>, rep: FastifyReplyTypebox<S> ) => Promise<Static<S["response"][200]>>
}

type FastifyRequestSchemaPayload<S> = FastifyRequest<{ Body: Static<S["body"]>, Headers: Static<S["headers"]>, Params: Static<S["params"]>, Reply: Static<S["response"][200]>, Querystring: Static<S["query"]> }>
type FastifyReplySchemaPayload<S> = FastifyReply<any, any, any, { Body: Static<S["body"]>, Headers: Static<S["headers"]>, Params: Static<S["params"]>, Reply: Static<S["response"][200]>, Querystring: Static<S["query"]> }>

type ControllerOptions<S> = {
    schema?: S
    handler: (req: FastifyRequestSchemaPayload<S>, res: FastifyReplySchemaPayload<S>) => Promise<Static<S["response"][200]>>
    preHandler? :((req: FastifyRequestSchemaPayload<S>, res: FastifyReplySchemaPayload<S>, next: Function) => void)[]
}

export function defineController<S>(options: ControllerOptions<S>) :ControllerOptions<S>

type Methods = 'delete' | 'get' | 'head' | 'patch' | 'post' | 'put' | 'options' |
    'propfind' | 'proppatch' | 'mkcol' | 'copy' | 'move' | 'lock' | 'unlock' | 'trace' | 'search'

export function defineRouter(app :FastifyInstance): { [K in Methods]: <U extends string>(url: U, controller: UnknownController) => FastifyInstance }