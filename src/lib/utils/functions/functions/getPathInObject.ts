//const uuidV4Regex = RegExp('^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$');
const uuidV4Regex = RegExp('^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$');

const isValidV4UUID = (uuid: string) => uuidV4Regex.test(uuid);

export const getPathInObject = (obj: object, maxDeepLevel: number, currDeepLevel?: number): any[] => {
    
    maxDeepLevel = ( maxDeepLevel || maxDeepLevel == 0 ) ? maxDeepLevel : 20;
    currDeepLevel = currDeepLevel ? currDeepLevel : 1 ;
    
    if (currDeepLevel > maxDeepLevel){
        return [];
    } else {
        var charSeparator: string = ".";
        var paths: string[] = [];
        
        for (var curr in obj) {
            var currElem = obj[curr];
            
            if( typeof currElem == "object" ){ // object is "object" and "array" is also in the eyes of "typeof"

                var deepPaths = getPathInObject( currElem, maxDeepLevel, currDeepLevel + 1)
                
                for (var e=0 ; e<deepPaths.length ; e++){

                    paths.push( curr + charSeparator + deepPaths[e]);
                    
                }
                
            } else { // not an object, check if UUID

                if (isValidV4UUID(currElem) ){ 
                    // return the element and its value
                    paths.push( curr + ';;' + currElem );
                }
            }
        }
        return paths;
    }
}