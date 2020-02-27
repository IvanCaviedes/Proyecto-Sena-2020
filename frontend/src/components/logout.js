import { Component } from 'react'

export default class logout extends Component {
    componentWillMount(){
        localStorage.clear();
        this.props.history.push('/');
    }
    render() {
        return null;
    }
}