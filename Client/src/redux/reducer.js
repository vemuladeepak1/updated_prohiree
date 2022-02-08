const initialState = {
    data:null
}
const userReducer=(state=initialState,action)=>{
    console.log(action.payload)
    switch(action.type){
        case "USER":return{
            ...state,
            data:action.payload
        }
        case "CLEAR": return{
            data: null
        }
        default:return state
    }
}
export default userReducer