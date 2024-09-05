export interface IHttpRequest<T extends any> {
    body: T;
    params?:{[key:string]:string};
    query?:{[key:string]:string};
    headers?:{[key:string]:string | undefined};

}

