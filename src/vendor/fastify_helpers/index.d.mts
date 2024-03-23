import  { type TObject, type Static, type TSchema, Type } from "@sinclair/typebox"
import type  { FastifyRequest, FastifyReply, RawServerDefault, RawRequestDefaultExpression, RawReplyDefaultExpression, FastifyInstance, FastifySchema, RouteGenericInterface, ContextConfigDefault  } from "fastify";

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

type FastifyRequestSchemaPayload<S> = FastifyRequest<{ Body: Static<S["body"]>, Headers: Static<S["headers"]>, Params: Static<S["params"]>, Reply: Static<S["response"][200]>, Querystring: Static<S["query"]> }>
type FastifyReplySchemaPayload<S> = FastifyReply<any, any, any, { Body: Static<S["body"]>, Headers: Static<S["headers"]>, Params: Static<S["params"]>, Reply: Static<S["response"][200]>, Querystring: Static<S["query"]> }>

type UnknownController = {
    schema?: any;
    handler: any
    preHandler?: ((req: any, resp: any, next: () => void) => void)[] 
}

type BaseController<S extends BaseSchema, D extends TSchema> = {
    data?: D;
    schema?: S;
    preHandler?: ((req: FastifyRequestSchemaPayload<S> & { data: Static<D> }, resp: FastifyReplySchemaPayload<S>, next: () => void) => void)[] 
    handler: (req: FastifyRequestSchemaPayload<S> & { data: Static<D> }, rep: FastifyReplySchemaPayload<S> ) => Promise<Static<S["response"][200]>>;
}

type PredefinedController<S extends BaseSchema, S0 extends BaseSchema, D extends TSchema, D0 extends TSchema> = {
    data?: D;
    schema?: S;
    preHandler?: ((req: FastifyRequestSchemaPayload<S>, resp: FastifyReplySchemaPayload<S>, next: () => void) => void)[] 
    handler: (req: FastifyRequestSchemaPayload<S & S0> & { data: Static<D> & Static<D0> }, rep: FastifyReplySchemaPayload<S & S0> ) => Promise<Static<S["response"][200]>>;
}


export function useControllerDefinition<S extends BaseSchema, D extends TSchema>(definition :Omit<BaseController<S, D>, "handler">) : <S1 extends BaseSchema, D1 extends TSchema>(options :PredefinedController<S1, S, D1, D>) => typeof definition & typeof options

type OldControllerOptions<S> = { 
    schema? :S,
    preHandler?: ((req: FastifyRequestSchemaPayload<S>, resp: FastifyReplySchemaPayload<S>, next: Function) => void)[] 
    handler: (req: FastifyRequestSchemaPayload<S>, rep: FastifyReplySchemaPayload<S> ) => Promise<Static<S["response"][200]>>
}

type ControllerOptions<S> = {
    schema?: S
    handler: (req: FastifyRequestSchemaPayload<S>, res: FastifyReplySchemaPayload<S>) => Promise<Static<S["response"][200]>>
    preHandler? :((req: FastifyRequestSchemaPayload<S>, res: FastifyReplySchemaPayload<S>, next: Function) => void)[]
}

export function defineController<S>(options: ControllerOptions<S>) :ControllerOptions<S>

type Methods = 'delete' | 'get' | 'head' | 'patch' | 'post' | 'put' | 'options' |
    'propfind' | 'proppatch' | 'mkcol' | 'copy' | 'move' | 'lock' | 'unlock' | 'trace' | 'search'

export function defineRouter(app :FastifyInstance): { [K in Methods]: <U extends string>(url: U, controller: UnknownController) => FastifyInstance }