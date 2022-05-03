import React from 'react';

interface Props {
}

const range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var timer: any;

interface State {
    genNumber: number;
}

export default class NumberLoader extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            genNumber: range[Math.ceil((Math.random() * 10 )% 9)]
        }
    }
    forInterval() {
        timer = setInterval(() => {
            this.setState({genNumber: range[Math.ceil((Math.random() * 10 )% 9)]});
        }, 50)
    }
    componentDidMount() {
       this.forInterval();
    }
    componentWillUnmount(){
        clearInterval(timer);
    }
    render() {
        let { genNumber } = this.state;
        let toRender = (
            <span>
                {genNumber + range[Math.ceil((Math.random() * 10 )% 9)]}
            </span>
        );
        return (
            <span>
                {toRender}
            </span>
        );
    }
}