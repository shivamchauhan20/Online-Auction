export const productActionCreator = (pid,author,pname,pdesc,amount,time,category,image,opr)=>{
    return{
        payload:{pid,author,pname,pdesc,amount,time,category,image},
        type:opr
    }
 }