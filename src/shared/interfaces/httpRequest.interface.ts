export interface IHttpRequest{
    body: any;
    params?:{[key:string]:string};
    query?:{[key:string]:string};
    headers?:{[key:string]:string | undefined};

}

