<script context="module">
    
    //const uuidV4Regex = RegExp('^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$');
    const uuidV4Regex = RegExp('^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$');

    const isValidV4UUID = (uuid) => uuidV4Regex.test(uuid);

    const getValuePathInObject = (obj, maxDeepLevel, currDeepLevel) => {
        
        maxDeepLevel = ( maxDeepLevel || maxDeepLevel == 0 ) ? maxDeepLevel : 20;
        currDeepLevel = currDeepLevel ? currDeepLevel : 1 ;
        
        if( currDeepLevel > maxDeepLevel ){
            return [];
        } else {
            var charSeparator = ".";
            var paths = [];
            var i=0;
            
            for(var curr in obj){
                var currElem = obj[curr];
                
                if( typeof currElem == "object" ){ // object is "object" and "array" is also in the eyes of "typeof"
                    // search again but set paramter to remember if daddy was an Array 

                    var daddyIsArray = Array.isArray(currElem);
                    var deepPaths = getValuePathInObject( currElem, maxDeepLevel, currDeepLevel + 1)
                    
                    for(var e=0 ; e<deepPaths.length ; e++){

					paths.push( curr + charSeparator + deepPaths[e]);
                        
                    }
                    
                } else { // not an object, check if UUID

                    if( isValidV4UUID(currElem) ){ 
                        // return the element and its valud
                        paths.push( curr + ';;' + currElem );
                    }
                }
                i++;
            }
            return paths;
        }
    }


    export const findUuids = (data) => {

        let testResult = getValuePathInObject(data,8);
        let resultSet = {};
            
        for (var finding in testResult) {
        
            var foundUuid = (testResult[finding].split(";;"))[1];
            var foundPath = (testResult[finding].split(";;"))[0];

            if (resultSet[foundUuid]) {
                resultSet[foundUuid].paths.push(foundPath);
            } else {
                resultSet[foundUuid] = {"paths": [foundPath]};
            } 
        }

        return resultSet;
    }

</script>