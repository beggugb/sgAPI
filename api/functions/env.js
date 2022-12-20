export const verifiDBEmpty = (params) =>{
    if(params === "" || params === 0 || params === '0' || params === "0" || params === undefined )
    {
        return 0
    }else{
        return params
    }
}
export const verifiDBNull = (params) =>{
    if(params === '--todos--' || params === null || params === '' || params === 0 || params === '0' || params === undefined )
    {
        return '%'
    }else{
        return '%'+params+'%'
    }
}

export const verifiDBNulls = (params) =>{
    if(params === '--todos--' || params === null || params === '' || params === 0 || params === '0' || params === undefined )
    {
        return '0'
    }else{
        return '%'+params+'%'
    }
}

export const isNUll = (dato) =>{
    if(dato){
        return dato
    }else{
        return 0
    }
}
export const isNUllArray = (data) =>{
    if(data){
        return data
    }else{
        return []
    } 
}


