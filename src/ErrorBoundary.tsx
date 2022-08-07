import React, { PropsWithChildren } from "react"

export default class ErrorBoundary extends React.Component<PropsWithChildren,{hasError:boolean}>{
    constructor(props:any){
        super(props)
        this.state = {
            hasError: false
        }
    }
    static getDerivedStateFromError(error:Error){
        return {
            hasError: true
        }
    }
    componentDidCatch(error:Error, info: React.ErrorInfo){
        console.log(error)
        // this.setState({hasErorr: true})
    }
    render(){
        if(this.state.hasError){
            return <h1>Something went wrong</h1>
        }
        return this.props.children
    }
}