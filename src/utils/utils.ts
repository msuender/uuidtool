interface IPaths {
    paths: string[]
}


export interface IResultSet {
    [index:string]: IPaths
}

export interface IUuidsFoundItem {
    uuid: string,
    paths: string[]
}

export interface IInputOutputJson {
    input1: object,
    input2?: object,
    input3?: object
}

export const enum EWhatToDo {
    clear = 'clear',
    copy = 'copy'
}

export const enum EInputFields {
    input1 = 'input1',
    input2 = 'input2',
    input3 = 'input3'
}