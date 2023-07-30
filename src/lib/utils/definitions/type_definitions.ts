
export interface IDataRecord {
    id: number;
    inputText: string;
    outputText: string;
    inputIsJson: boolean;
}

export interface ISearchResult {
    paths: string[];
    uuid: string;
    selected: boolean;
}

export interface IResultSet {
    [index:string]: ISearchResult;
}

export interface IConvertedDataRecords {
    [index:string]: Object;
}
