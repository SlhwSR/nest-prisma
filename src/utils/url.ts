
export const url=(url:string)=>{
    const result=process.env.NODE_ENV==="development"?"http://localhost:3000/"+url:"https://live.iyyszx.top/"+url
    return result
}