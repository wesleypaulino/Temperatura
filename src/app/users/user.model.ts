//------------------------------------------
//Get Lista de usuario 
//-------------------------------------------
    export interface User {
        id: number;
        first_name: string;
        last_name: string;
        empresa: string;
        filial: string;
        mat: string;
        nomecmp: string;
        funcao: string;
        date: string;
        time: string;
        temp: string;
    }

    export interface ResponseUsers {
        data: User[];
    }

    //-------------------------------------------
    //Get um unico usuario - GetUser
    //-------------------------------------------
    export interface ResponseUser {
        data: User;
    }

    //-------------------------------------------
    //Post - Request
    //-------------------------------------------
    export interface RequestCreate {
        name: string;
        job: string;
    }

    //-------------------------------------------
    //Post Response
    //-------------------------------------------
    export interface ResponseCreate {
        id: number;
        last_name: string;
        name: string;
        job: string;
        mat: string;
        createdAt: Date;
    }

     //-------------------------------------------
    //Put - Update Request
    //-------------------------------------------
    export interface RequestUpdate {
        empresa: string;
        filial: string;
        mat: string;
        nomecmp: string;
        funcao: string;
        date: string;
        time: string;
        temp: string;
    }

    //-------------------------------------------
    //Put - Update Response
    //-------------------------------------------
    export interface ResponseUpdate {
        empresa: string;
        filial: string;
        mat: string;
        nomecmp: string;
        funcao: string;
        date: string;
        time: string;
        temp: string;
    }