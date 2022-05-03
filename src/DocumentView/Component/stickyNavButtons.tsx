import React, { Component } from 'react';
import { isNullOrUndefined } from 'is-what';

interface Props {
    dataPoints: string[];
    tempParaIndex: number;
    getScrolledIndex: (scrolledChildIndex: number) => void;
    type: string;
    superImposedChildIndex: number;
}

interface State {
    currentParaId: string;
    currentIndex: number;
    extremeEnd: string;
}

export default class StickyNavButtons extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentParaId: props.dataPoints[0],
            currentIndex: 0,
            extremeEnd: 'up'
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        let { dataPoints, tempParaIndex, type, superImposedChildIndex } = nextProps;
        if (dataPoints !== this.props.dataPoints && type !== this.props.type) {
            this.setState({ currentIndex: 0, currentParaId: dataPoints[0], extremeEnd: 'up' });
        }
        if (dataPoints !== this.props.dataPoints || superImposedChildIndex !== this.props.superImposedChildIndex) {
            this.setState({ currentIndex: tempParaIndex, currentParaId: dataPoints[tempParaIndex] });
            if (tempParaIndex === 0) { //For disabling buttons at extreme ends.
                this.setState({ extremeEnd: 'up' })
            } else if (tempParaIndex === dataPoints.length - 1) {
                this.setState({ extremeEnd: 'down' })
            } else {
                this.setState({ extremeEnd: '' })
            }
        }
        if (type === 'bi' && superImposedChildIndex !== this.props.superImposedChildIndex) {
            if (superImposedChildIndex > this.props.superImposedChildIndex) {
                this.scrollTo('down')
            } else if (superImposedChildIndex < this.props.superImposedChildIndex) {
                this.scrollTo('up')
            }
        }
    }

    render() {
        let { extremeEnd, currentIndex } = this.state;
        let { dataPoints, superImposedChildIndex } = this.props;
        let displayCurrentIndex = superImposedChildIndex === 0 ? currentIndex + 1 : superImposedChildIndex + 1;
        return (
            <div className="sticky-nav-buttons" style={{ zIndex:20 }} >
                <div className="scroll-info-box">{displayCurrentIndex + ' / ' + dataPoints.length}</div>
                <img style={{ cursor: extremeEnd === 'up' ? 'default' : 'pointer' }} src={extremeEnd === 'up' ? '/static_images/docscroll-uparrow.svg' : '/static_images/docscroll-uparrow-active.svg'} onClick={() => this.scrollTo('up')} />
                <img style={{ cursor: extremeEnd === 'down' ? 'default' : 'pointer' }} src={extremeEnd === 'down' ? '/static_images/docscroll-downarrow.svg' : '/static_images/docscroll-downarrow-active.svg'} onClick={() => this.scrollTo('down')} />
            </div>
        );
    }

    setCurrentParaID(action: string) {
        let { dataPoints } = this.props;
        let { currentParaId } = this.state;
        let index = dataPoints.findIndex((el) => { return el === currentParaId });
        if (index > -1) {
            switch (action) {
                case 'up': {
                    if (index - 1 >= 0) {
                        return dataPoints[index - 1];
                    } else {
                        return currentParaId;
                    }
                }
                case 'down': {
                    if (index + 1 < dataPoints.length) {
                        return dataPoints[index + 1];
                    } else {
                        return currentParaId;
                    }
                }
                default: {
                    return currentParaId;
                }
            }
        } else {
            return currentParaId;
        }
    }

    scrollTo = (direction: string) => {
        let { dataPoints, getScrolledIndex, type } = this.props;
        let current: string = '';
        if (direction === 'up') {
            current = this.setCurrentParaID('up');
            this.setState({ currentParaId: current });
            this.scrollUp(current);
        } else if (direction === 'down') {
            current = this.setCurrentParaID('down');
            this.setState({ currentParaId: current });
            this.scrollDown(current);
        }
        let index = dataPoints.findIndex((el) => { return el === current });
        if (index > -1) {
            this.setState({ currentIndex: index });
            type === 'bi' && getScrolledIndex(index);
            if (index === 0) { //For disabling buttons at extreme ends.
                this.setState({ extremeEnd: 'up' })
            } else if (index === dataPoints.length - 1) {
                this.setState({ extremeEnd: 'down' })
            } else {
                this.setState({ extremeEnd: '' })
            }
        }
    }

    scrollUp(current: string) {
        let paraHeader = document.getElementById(current);
        !isNullOrUndefined(paraHeader) && paraHeader.scrollIntoView({ block: 'center' });
    }

    scrollDown(current: string) {
        let paraHeader = document.getElementById(current);
        !isNullOrUndefined(paraHeader) && paraHeader.scrollIntoView({ block: 'center' });
    }
}