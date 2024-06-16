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

export function defineSchema<S extends BaseSchema>(schema :S) : S;

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

type InformationalStatuses = IntRange<100, 200>
type SuccessStatuses = IntRange<200, 300>
type RedirectionStatuses = IntRange<300, 400>
type ClientErrorStatuses = IntRange<400, 500>
type ServerErrorStatuses = IntRange<500, 600>

type InferDefaultResponse<U> = U extends Record<"default", TSchema> ? Static<U["default"]> : never

type InferResponseByCode<C, T> = T extends BaseSchema
    ? T["response"] extends (infer U) | undefined
        ?  U extends Record<C, TSchema>
            ? Static<U[C]>
            : U extends Record<(infer N), TSchema>
                ? C extends InformationalStatuses
                    ? U extends Record<"1XX", TSchema>
                        ? Static<U["1XX"]>
                        : InferDefaultResponse<U>
                    : C extends SuccessStatuses
                        ? U extends Record<"2XX", TSchema>
                            ? Static<U["2XX"]>
                            : InferDefaultResponse<U>
                        : C extends RedirectionStatuses
                            ? U extends Record<"3XX", TSchema>
                                ? Static<U["3XX"]>
                                : InferDefaultResponse<U>
                            : C extends ClientErrorStatuses
                                ? U extends Record<"4XX", TSchema>
                                    ? Static<U["4XX"]>
                                    : InferDefaultResponse<U>
                                : C extends ServerErrorStatuses
                                    ? U extends Record<"5XX", TSchema>
                                        ? Static<U["5XX"]>
                                        : InferDefaultResponse<U>
                                    : never
                : never
        : never
    : never

type ReplyUtils<S> = {
    sendCode<C extends number>(code :C, payload: InferResponseByCode<C, S>): any
}

type FastifyRequestSchemaPayload<S> = FastifyRequest<{ Body: Static<S["body"]>, Headers: Static<S["headers"]>, Params: Static<S["params"]>, Reply: Static<S["response"][200]>, Querystring: Static<S["query"]> }>
type FastifyReplySchemaPayload<S> = FastifyReply<any, any, any, { Body: Static<S["body"]>, Headers: Static<S["headers"]>, Params: Static<S["params"]>, Reply: Static<S["response"][200]>, Querystring: Static<S["query"]> }> & ReplyUtils<S>

type UnknownController = {
    schema?: any;
    handler: any
    preHandler?: ((req: any, resp: any, next: () => void) => void)[] 
}

type BaseController<S extends BaseSchema, D extends TSchema> = {
    locals?: D;
    schema?: S;
    preHandler?: ((req: FastifyRequestSchemaPayload<S> & { locals: Static<D> }, resp: FastifyReplySchemaPayload<S>, next: () => void) => void)[] 
    handler: (req: FastifyRequestSchemaPayload<S> & { locals: Static<D> }, rep: FastifyReplySchemaPayload<S> ) => Promise<Static<S["response"][200]>>;
}

type PredefinedController<S extends BaseSchema, S0 extends BaseSchema, D extends TSchema, D0 extends TSchema> = {
    locals?: D;
    schema?: S;
    preHandler?: ((req: FastifyRequestSchemaPayload<S>, resp: FastifyReplySchemaPayload<S>, next: () => void) => void)[] 
    handler: (req: FastifyRequestSchemaPayload<S & S0> & { locals: Static<D> & Static<D0> }, rep: FastifyReplySchemaPayload<S & S0> ) => Promise<Static<S["response"][200]>>;
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

export function initRouter(app :FastifyInstance): void
