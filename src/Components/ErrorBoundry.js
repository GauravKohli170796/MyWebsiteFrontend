import React, { Component } from 'react'

class ErrorBoundry extends Component {
constructor(props) {
    super(props)

    this.state = {
        IsError:false,
        info:null
         
    }
}

componentDidCatch(error,info)
{
    if(error || info)
    {
        this.setState({
            IsError:true,
            info:info
        })
    }

}


    render() {
        if(this.state.IsError)
        {
            return (
                <div>
                  {this.state.info}
                </div>
            )
        }

        else
        {
            return (
                <div>
            {this.props.children}
           </div>
            )
        }
    }
}

export default ErrorBoundry;
