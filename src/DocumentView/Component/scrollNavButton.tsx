import React, { Component } from 'react';
import { start } from 'repl';

interface Props{
    dataPoints: string[];
    currentScrollIndex: number;
    type: string;
    selectedInsightPoint: string;
    setCurrentScrollIndex:(currentScrollIndex: number)=> void;
}

interface State{
    localScrollIndex: number;
    extremeEnd: string;
}

export default class ScrollNavButton extends Component<Props, State> {

    constructor(props: Props){
        super(props);
        this.state={
            localScrollIndex: 0,
            extremeEnd: 'up'
        };
    }

    componentWillReceiveProps(nextProps: Props){
        if((this.props.currentScrollIndex !== nextProps.currentScrollIndex
            /*  && this.props.dataPoints !== nextProps.dataPoints */)){
            if(nextProps.currentScrollIndex === 0){
                this.scrollToZero(nextProps.dataPoints[0]);
                this.setState({ localScrollIndex: nextProps.currentScrollIndex, extremeEnd: 'up' });
            }
        }
    }

    render(){
        let {dataPoints} = this.props;
        let {extremeEnd} = this.state;
        let displayCurrentIndex = this.state.localScrollIndex + 1;

        return (
            <div className="sticky-nav-buttons" style={{ zIndex:20 }}>
                <div className="scroll-info-box">{displayCurrentIndex + ' / ' + dataPoints.length}</div>
                <img style={{ cursor: extremeEnd === 'up' ? 'default' : 'pointer' }} src={extremeEnd === 'up' ? '/static_images/docscroll-uparrow.svg' : '/static_images/docscroll-uparrow-active.svg'} onClick={() => this.scrollTo('up')} />
                <img style={{ cursor: extremeEnd === 'down' ? 'default' : 'pointer' }} src={extremeEnd === 'down' ? '/static_images/docscroll-downarrow.svg' : '/static_images/docscroll-downarrow-active.svg'} onClick={() => this.scrollTo('down')} />
            </div>
        );
    }

    scrollTo(direction: string){
        let {localScrollIndex} = this.state;
        let {dataPoints} = this.props;
        let currentScrollIndex = -1;
        if(direction === 'up'){
            currentScrollIndex = localScrollIndex - 1;
            if(currentScrollIndex >= 0){
                if (currentScrollIndex === 0){
                    this.setState({localScrollIndex: currentScrollIndex, extremeEnd: 'up'});
                }else {
                    this.setState({localScrollIndex: currentScrollIndex, extremeEnd: ''});
                }
                this.props.setCurrentScrollIndex(currentScrollIndex);
                this.scrollUp(dataPoints[currentScrollIndex]);
            }
        } else if (direction === 'down'){
            currentScrollIndex = localScrollIndex + 1;
            if(currentScrollIndex <= dataPoints.length - 1 ){
                if(currentScrollIndex === dataPoints.length - 1){
                    this.setState({localScrollIndex: currentScrollIndex, extremeEnd: 'down'});
                } else {
                    this.setState({localScrollIndex: currentScrollIndex, extremeEnd: ''});
                }
                this.props.setCurrentScrollIndex(currentScrollIndex);
                this.scrollDown(dataPoints[currentScrollIndex]);
            }
        }
    }

    scrollToZero(startDataPointIndex: string){
        let paraHeader = document.getElementById(startDataPointIndex);
        if(paraHeader !== null && paraHeader !== undefined){
            paraHeader.scrollIntoView({block: 'center'});
        }
    }

    scrollUp(current: string) {
        let paraHeader = document.getElementById(current);
        if(paraHeader !== null && paraHeader !== undefined){
            paraHeader.scrollIntoView({ block: 'center' });
        }
    }

    scrollDown(current: string) {
        let paraHeader = document.getElementById(current);
        if(paraHeader !== null && paraHeader !== undefined){
            paraHeader.scrollIntoView({ block: 'center' });
        }
    }
}